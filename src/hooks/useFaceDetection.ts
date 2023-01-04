// "use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),n=function(){return n=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},n.apply(this,arguments)};
// /*! *****************************************************************************
// Copyright (c) Microsoft Corporation.

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.
// ***************************************************************************** */function t(e,n,t,r){return new(t||(t=Promise))((function(o,i){function u(e){try{a(r.next(e))}catch(e){i(e)}}function c(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(u,c)}a((r=r.apply(e,n||[])).next())}))}function r(e,n){var t,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;u;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=n.call(e,u)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}exports.useFaceDetection=function(o){var i=o||{},u=i.mirrored,c=i.handleOnResults,a=i.faceDetectionOptions,s=i.faceDetection,l=i.camera,f=e.useState([]),d=f[0],h=f[1],b=e.useState(!0),p=b[0],v=b[1],g=e.useRef(null),y=e.useRef(null),w=e.useRef(l).current,m=e.useRef(s).current,x=e.useRef(a),R=e.useCallback((function(e){c&&c(e);var t=e.detections.map((function(e){var t=e.boundingBox.xCenter-e.boundingBox.width/2;return n(n({},e.boundingBox),{yCenter:e.boundingBox.yCenter-e.boundingBox.height/2,xCenter:u?1-t:t})}));h(t)}),[c,u]),O=e.useCallback((function(e){return t(void 0,void 0,void 0,(function(){var o;return r(this,(function(i){switch(i.label){case 0:return m.setOptions(n({},x.current)),m.onResults(R),e instanceof HTMLVideoElement&&w&&(o={mediaSrc:e,width:e.videoWidth,height:e.videoHeight,onFrame:function(){return t(void 0,void 0,void 0,(function(){return r(this,(function(n){switch(n.label){case 0:return[4,m.send({image:e})];case 1:return n.sent(),p&&v(!1),[2]}}))}))}},w(o).start()),e instanceof HTMLImageElement?[4,m.send({image:e})]:[3,2];case 1:i.sent(),p&&v(!1),i.label=2;case 2:return[2]}}))}))}),[w,m,p,R]);return e.useEffect((function(){g.current&&g.current.video&&O(g.current.video),y.current&&O(y.current)}),[O,p,R]),{boundingBox:d,isLoading:p,detected:d.length>0,facesDetected:d.length,webcamRef:g,imgRef:y}};
// //# sourceMappingURL=index.js.map

import { useCallback, useRef, useState } from 'react';

export const useFaceDetection = (props) => {
  const {
    mirrored,
    handleOnResults,
    faceDetectionOptions: options,
    faceDetection: faceDetectionInitializer,
    camera: cameraInitializer,
  } = props || {};

  /** Bounding Box for element to use, e.g. can create a bounding box with these values using a div  */
  const [boundingBox, setBoundingBox] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /** Refs */
  const camera = useRef(cameraInitializer).current;
  const faceDetection = useRef(faceDetectionInitializer).current;
  const faceDetectionOptions = useRef(options);

  const onResults = useCallback(
    (results) => {
      /** Callback to return detection results */
      if (handleOnResults) handleOnResults(results);

      const { detections } = results;

      /** Set bounding box data */
      const boundingBoxes = detections.map((detection) => {
        const xCenter = detection.boundingBox.xCenter - detection.boundingBox.width / 2;
        return {
          ...detection.boundingBox,
          yCenter: detection.boundingBox.yCenter - detection.boundingBox.height / 2,
          xCenter: mirrored ? 1 - xCenter : xCenter,
        };
      });

      setBoundingBox(boundingBoxes);
    },
    [handleOnResults, mirrored],
  );

  const handleFaceDetection = async (mediaSrc) => {
    /** Configure faceDetection usage/options */
    faceDetection.setOptions({ ...faceDetectionOptions.current });
    faceDetection.onResults(onResults);

    /** Handle webcam detection */
    if (mediaSrc instanceof HTMLVideoElement && camera) {
      const cameraConfig = {
        mediaSrc,
        width: mediaSrc.videoWidth,
        height: mediaSrc.videoHeight,
        onFrame: async () => {
          await faceDetection.send({ image: mediaSrc });
          if (isLoading) setIsLoading(false);
        },
      };

      camera(cameraConfig).start();
    }

    /** Handle image face detection */
    if (mediaSrc instanceof HTMLImageElement) {
      await faceDetection.send({ image: mediaSrc });
      if (isLoading) setIsLoading(false);
    }
  };

  return {
    boundingBox,
    isLoading,
    detected: boundingBox.length > 0,
    facesDetected: boundingBox.length,
    handleFaceDetection,
    onResults,
  };
};

export default useFaceDetection;
