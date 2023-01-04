var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useCallback, useEffect, useRef, useState } from 'react';
export var useFaceDetection = function (props) {
    var _a = props || {}, mirrored = _a.mirrored, handleOnResults = _a.handleOnResults, options = _a.faceDetectionOptions, faceDetectionInitializer = _a.faceDetection, cameraInitializer = _a.camera;
    /** Bounding Box for element to use, e.g. can create a bounding box with these values using a div  */
    var _b = useState([]), boundingBox = _b[0], setBoundingBox = _b[1];
    var _c = useState(true), isLoading = _c[0], setIsLoading = _c[1];
    /** Refs */
    var webcamRef = useRef(null);
    var imgRef = useRef(null);
    var camera = useRef(cameraInitializer).current;
    var faceDetection = useRef(faceDetectionInitializer).current;
    var faceDetectionOptions = useRef(options);
    var onResults = useCallback(function (results) {
        /** Callback to return detection results */
        if (handleOnResults)
            handleOnResults(results);
        var detections = results.detections;
        /** Set bounding box data */
        var boundingBoxes = detections.map(function (detection) {
            var xCenter = detection.boundingBox.xCenter - detection.boundingBox.width / 2;
            return __assign(__assign({}, detection.boundingBox), { yCenter: detection.boundingBox.yCenter - detection.boundingBox.height / 2, xCenter: mirrored ? 1 - xCenter : xCenter });
        });
        setBoundingBox(boundingBoxes);
    }, [handleOnResults, mirrored]);
    var handleFaceDetection = function (mediaSrc) { return __awaiter(void 0, void 0, void 0, function () {
        var cameraConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /** Configure faceDetection usage/options */
                    faceDetection.setOptions(__assign({}, faceDetectionOptions.current));
                    faceDetection.onResults(onResults);
                    /** Handle webcam detection */
                    if (mediaSrc instanceof HTMLVideoElement && camera) {
                        cameraConfig = {
                            mediaSrc: mediaSrc,
                            width: mediaSrc.videoWidth,
                            height: mediaSrc.videoHeight,
                            onFrame: function () { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, faceDetection.send({ image: mediaSrc })];
                                        case 1:
                                            _a.sent();
                                            if (isLoading)
                                                setIsLoading(false);
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        };
                        camera(cameraConfig).start();
                    }
                    if (!(mediaSrc instanceof HTMLImageElement)) return [3 /*break*/, 2];
                    return [4 /*yield*/, faceDetection.send({ image: mediaSrc })];
                case 1:
                    _a.sent();
                    if (isLoading)
                        setIsLoading(false);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (webcamRef.current && webcamRef.current.video) {
            var dataInterval = setInterval(function () {
                handleFaceDetection(webcamRef.current.video);
            }, 1000);
            return clearInterval(dataInterval);
        }
        if (imgRef.current) {
            handleFaceDetection(imgRef.current);
        }
    }, [handleFaceDetection, isLoading, onResults]);
    return {
        boundingBox: boundingBox,
        isLoading: isLoading,
        detected: boundingBox.length > 0,
        facesDetected: boundingBox.length,
        webcamRef: webcamRef,
        imgRef: imgRef,
    };
};
export default useFaceDetection;
//# sourceMappingURL=useFaceDetection.js.map