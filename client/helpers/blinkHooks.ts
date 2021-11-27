/** @format */

import { createElement, useEffect, useState, useRef } from 'react'
import { singletonHook } from 'react-singleton-hook'
import * as Blink from '@microblink/blinkid-in-browser-sdk'

const init = null

async function blinkInit(): Promise<void | Blink.WasmSDK> {
  const [_blink, _setBlink] = useState<Blink.WasmSDK>(null)

  useEffect(() => {
    // Check if browser is supported
    if (!Blink.isBrowserSupported()) {
      Promise.reject('This browser is not supported by the SDK!')
    }

    async function _getWasm(): Promise<Blink.WasmSDK> {
      const loadSettings = new Blink.WasmSDKLoadSettings(
        'sRwAAAYJbG9jYWxob3N0r/lOPgo/w35CpJmmLsUfzc1FN5dGC608ZypZjCzktpoQjBRyebt+eyH2EPKI3V7j6tYqzVqH7AupKuRgDsX9PX87s+xo05SZbFuGxF0Sfqs5/4d8nmqmHPTCpxN7odxtU8l3tdDSBnSqKNAdzdgiQHfFWmJyCsWEj99YUNbBKZDFdumo5EiExZi1WSFimNpg91ZJvSAsWOw0U0mRkEuFTOvLIEYly3DrqsA=y'
      )
      loadSettings.engineLocation = 'http://localhost:8888/blink'

      return Blink.loadWasmModule(loadSettings).then(
        (wasm: Blink.WasmSDK) => wasm,
        (error: any) => Promise.reject(`Error during the initialization of the SDK! ${error}`)
      )
    }

    async function _getRunner(wasm): Promise<[Blink.BlinkIdRecognizer, Blink.RecognizerRunner]> {
      const recognizer = await Blink.createBlinkIdRecognizer(wasm)
      const runner = await Blink.createRecognizerRunner(wasm, [recognizer], true)

      return [recognizer, runner]
    }

    async function _bootstrap() {
      const wasm = await _getWasm()
      const [recognizer, runner] = await _getRunner(wasm)

      const element = document.getElementById('blink') as HTMLVideoElement

      try {
        // There is more than one way to handle recognition
        // Using the recognize() method will provide you with the default behavior,
        // such as built-in error handling, timeout and video feed pausing.
        const videoRecognizer = await Blink.VideoRecognizer.createVideoRecognizerFromCameraStream(element, runner)
        const processResult = await videoRecognizer.recognize()

        if (processResult !== Blink.RecognizerResultState.Empty) {
          const recognitionResult = await recognizer.getResult()
          console.log(recognitionResult)

          // if (recognitionResult.address.length < 10) {
          //   videoRecognizer.resumeRecognition(true)
          // }
        } else {
          console.log('Recognition was not successful!')
        }
      } catch (error) {
        if (error.name === 'VideoRecognizerError') {
          // Reason is of type Blink.NotSupportedReason and contains information why video
          // recognizer could not be used. Usually this happens when user didn't grant access to a
          // camera or when a hardware or OS error occurs.
          Promise.reject((error as Blink.VideoRecognizerError).reason)
        }
      }
    }

    _bootstrap()
  }, [])

  return _blink
}

export const useBlink = singletonHook(init, blinkInit)
