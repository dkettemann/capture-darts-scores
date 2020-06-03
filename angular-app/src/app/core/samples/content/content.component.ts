import {Component, OnInit} from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {api, userID, username} from '../../../shared/store/variables';
import {WindowRef} from '../../../shared/WindowRef';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private windowRef: WindowRef
  ) {
    const window = windowRef.nativeWindow
  }

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  imgServerURL = undefined;

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        console.log('init is done!');
        // this.showNextWebcam(true)
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.sendImage();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
    if (deviceId === '95b9924aaba406c6a33248d8273dcb620e25aa5828f9201d8a7c0a888bc9a6db') {
      this.showNextWebcam(true);
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  scrollToTheImage() {
    const snapshot = document.getElementById('snapshot');
    if (snapshot !== null) {
      snapshot.scrollIntoView({block: 'end', behavior: 'smooth'});
    }
  }

  sendImage() {
    try {
      const file = this.dataURItoBlob(this.webcamImage.imageAsDataUrl);

      const fd = new FormData()
      fd.append('user_id', userID)
      fd.append('user_name', username)
      fd.append('path', '/' + 'image.jpeg')
      fd.append('status', 'private')
      fd.append('name', 'image.jpeg')
      fd.append('kind', 'jpeg')
      fd.append('file', file, 'image.jpeg')

      let headers = new HttpHeaders().set('Authorization', 'getSessionToken()')
      this.httpClient.post(
        api + 'documents/upload',
        fd,
        {headers, reportProgress: true, observe: 'events'}
      ).subscribe((event: any) => {
          if (event.type === HttpEventType.DownloadProgress) {
            console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%')
          } else if (event.type === HttpEventType.Response) {
            this.imgServerURL = api + event.body.document.src_path
          }
        },
        (error) => {
          console.log('Server Error')
          return console.log(error)
        })
    } catch (e) {
      console.log('Error in sendImage: ');
      console.log(e);
    }
  }

  postExample() {
    try {
      let headers = new HttpHeaders().set('Authorization', 'getSessionToken()');

      let obs = this.httpClient.post(
        api + 'documents/creategdoc',
        {
          user_id: userID,
          document: {
            name: 'ProjektVerlauf.gdoc',
            user_id: userID,
            link: 'https://docs.google.com/document/d/1lqDxu7f-q49z3BR8EOnpmsY0HaYozfT_56Ydcg3jwaI/edit#heading=h.mcfqtvzd3xju',
            parent_id: '',
            status: 'private',
            path: 'ProjektVerlauf.gdoc'
          }
        },
        {headers}
      );
      obs.subscribe((response) => {
          console.log(response);
        },
        (error) => {
          console.log('Server Error');
          console.log(error);
        });
    } catch (e) {
      console.log('Error in sendImage: ');
      console.log(e);
    }
  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    let byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    let dataView = new DataView(arrayBuffer);
    let blob = new Blob([dataView], { type: mimeString });
    return blob;
  }

  navigate(url) {
    window.open(url)
  }
}
