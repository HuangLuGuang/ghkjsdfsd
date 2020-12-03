import { Injectable } from '@angular/core';

import { catchError, finalize, mergeMap, tap } from 'rxjs/operators';

// http 拦截器!
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse }from '@angular/common/http';

import { loginurl,ssotoken,MULU }from '../../appconfig';

// 路由
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ExpiredTokenComponent } from '../../pages-popups/token-diallog/expired-token/expired-token.component';
import { PublicmethodService } from '../publicmethod/publicmethod.service';

/* 将未受影响的请求传递给下一个请求处理程序。*/

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private dialogService: NbDialogService, private publicservice: PublicmethodService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler){
    const started = Date.now();
    let ok: string;
    return next.handle(req)
      .pipe(
        tap(
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          error => {
            ok = 'failed'; 
            if (error.status != 200){
              this.Printerr(error);
            }else{
            }
          }
        ),
        // Log when response observable either completes or errors 完成或出现错误时记录日志
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
            //  console.warn("完成或出现错误时记录日志", msg)
        }),
        
      );
    
  }

  Printerr(req:HttpErrorResponse){
    // console.warn("输出,req: ",req);
    // 500 502 503 504   miscellaneous/500
    var status_code = [500,501,502,503,504,505,506,507,508,509]
    var status = req.status;
    if (status_code.indexOf(status) != -1){
      this.router.navigate(['/miscellaneous/500']);
    } else if (status === 401) { // ExpiredTokenComponent
      const alert401flag = localStorage.getItem('alert401flag');
      if (alert401flag !== 'true') {
        this.dialogService.open(ExpiredTokenComponent, { closeOnBackdropClick: false,} ).onClose.subscribe(
        name => {
          if (name) {
            // 删除之前的缓存
            localStorage.removeItem(ssotoken);
            // localStorage.removeItem(MULU);
            // location.href = loginurl;
            this.router.navigate([loginurl]);
          } else {
          }
        });
      }
      localStorage.setItem('alert401flag', 'true');
      return 0;
    }else{
      // this.danger()
      console.warn("网络异常：查看是否断网！")
    }
  }

  // Printerr(req:HttpErrorResponse){
  //   console.warn("输出,req: ",req);
  //   // 500 502 503 504   miscellaneous/500
  //   var status_code = [500,501,502,503,504,505,506,507,508,509]
  //   var status = req.status;
  //   if (status_code.indexOf(status) != -1){
  //     this.router.navigate(['/miscellaneous/500']);
  //   }else if(status === 401){ // ExpiredTokenComponent
  //     localStorage.setItem("token_expired", 'true');
  //     return 0;
  //   }else if(status === 403){
  //     this.router.navigate(['/miscellaneous/403']);
  //   }{
  //     // this.danger()
  //     console.warn("网络异常：查看是否断网！")
  //   }
  // }

  danger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"网络异常"});
  }

}
