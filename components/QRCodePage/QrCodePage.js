import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { saveAs } from 'file-saver';
import Spinner from "./Spinner";
import { getCheckStatusMidtrans } from "../../utils/apiHandlers";
import router from 'next/router';


export default function QrCodePage() {

  const env = process.env.NODE_ENV;

  const state_url = useSelector((state) => state.KodeReducer.url)
  const state_base64 = useSelector((state) => state.KodeReducer.base64)
  const midtrans_id = useSelector((state) => state.KodeReducer.midtrans_id)
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const loadingImgStyle = { display: loaded ? "none" : undefined };

  const displayImgStyle = { display: loaded ? undefined : "none" };

  const [imgSource, setImgSource] = useState("");

  const cookies_qrcode = Cookies.get('qrcode');
  const cookies_base64_qr = Cookies.get('base64_qr');
  const cookies_midtrans_id = Cookies.get('midtrans_id');


  if (typeof cookies_qrcode !== 'undefined') {
    if (typeof state_url !== 'undefined') {
      if (state_url !== cookies_qrcode) {
        Cookies.set('qrcode', state_url)
      }
    }
  } else {
    Cookies.set('qrcode', state_url)
  }


  if (typeof cookies_base64_qr !== 'undefined') {
    if (typeof state_base64 !== 'undefined') {
      if (state_base64 !== cookies_base64_qr) {
        Cookies.set('base64_qr', state_base64)
      }
    }
  } else {
    Cookies.set('base64_qr', state_base64)
  }


  if (typeof cookies_midtrans_id !== 'undefined') {
    if (typeof midtrans_id !== 'undefined') {
      if (midtrans_id !== cookies_midtrans_id) {
        Cookies.set('midtrans_id', midtrans_id)
      }
    }
  } else {
    Cookies.set('midtrans_id', midtrans_id)
  }


  let set_qrcode = '';
  let set_base64_qr = '';
  let set_midtrans_id = '';

  set_qrcode = Cookies.get('qrcode');
  set_base64_qr = Cookies.get('base64_qr');
  set_midtrans_id = Cookies.get('midtrans_id');


  useEffect(() => {
    //here to mimic a slow loading time
    setTimeout(() => {
      setImgSource(set_qrcode);
    }, 500);
  }, []);

  // ==========================================================================================

  const convertBase64ToFile = (base64String, fileName) => {
    let arr = base64String.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
      uint8Array[n] = bstr.charCodeAt(n);
    }
    let file = new File([uint8Array], fileName, { type: mime });
    return file;
  }

  function downloadBase64Data() {
    let file = convertBase64ToFile(set_base64_qr, "qr_code.png");
    saveAs(file, "qr_code.png");
  }

  const checkStatusPayment = async () => {
    const checkStatus = await getCheckStatusMidtrans(set_midtrans_id);
    // console.log(checkStatus?.data?.transaction_status);
    const type = checkStatus?.data?.payment_type;
    router.push(`/verify-order?payment_type=${type}&order_id=${set_midtrans_id}`)
  }

  const setLinkQrCode = <p className='mx-auto'>{imgSource}</p>;
  return (
    <>
      <div className="mt-40 flex justify-center">
        <p className="w-1/2 text-4xl font-semibold text-center">QR Code</p>
      </div>
      <div className="w-full justify-center mt-7">
        <p className="text-center text-stone-50">
          Silahkan simpan atau scan QR Code dibawah untuk melanjutkan pembayaran
        </p>

      </div>
      <div className="w-full flex flex-col items-center mt-7">
        <img src={Spinner}
          width={210}
          height={210}
          style={loadingImgStyle}
          className='py-10 pt-10' />

        <img src={imgSource}
          width={283}
          height={283}
          style={displayImgStyle}
          onLoad={() => {
            setLoaded(true);
          }
          }
          id='image_qrcode'
          onError={(e) => {
            setError(e);
          }} />
      </div>
      <div className="flex flex-col mb-10 ">
        {(env === 'development') ? setLinkQrCode : ""}
        <div className='flex justify-center'>
          <button type="button" className="lg:ml-auto mr-5 w-48 mt-6 px-4 py-3 border border-transparent text-base leading-4 font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center cursor-pointer" onClick={downloadBase64Data}>
            Simpan QR Code
          </button>

          <button type="button" className="lg:mr-auto ml-5 w-60 mt-6 px-4 py-3 border border-blue-600 text-base leading-4 font-medium rounded-full shadow-sm text-blue-600 hover:text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center cursor-pointer" onClick={checkStatusPayment}>
            Lihat Status Pembayaran
          </button>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center mt-1 gap-2 mb-32">
        <p>Powered by</p>
        <img src='../png/qris.png' width={117} height={20} crossOrigin='anonymous' />
      </div>

    </>
  )
}