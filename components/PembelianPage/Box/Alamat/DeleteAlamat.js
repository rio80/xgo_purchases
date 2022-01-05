import { Dialog } from "@headlessui/react";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/solid";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AlamatAction } from "../../../../store/Alamat/AlamatAction";
import { DeleteAlamatAction } from "../../../../store/DeleteAlamat/DeleteAlamatAction";
import { deleteAddress } from "../../../../utils/apiHandlers";

export default function DeleteAlamat() {
    const dispatch = useDispatch()

    function getEmail() {
        const CryptoJS = require("crypto-js");
        const key = CryptoJS.enc.Hex.parse('5472346e73563173316f6e3230323178');
        const iv = CryptoJS.enc.Hex.parse('2b5261354e7356697331306e32303231');
        const auth = Cookies.get('auth')
        const decrypted = CryptoJS.AES.decrypt(auth, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);

        return decrypted
    }

    const custId = useSelector((state) => state.DeleteAlamatReducer.customer_address_id)
    const alamatRedux = useSelector((state) => state.AlamatReducer.main_address)

    const handleDelete = async () => {
        let dataDel = { email: getEmail(), customer_address_id: [custId] }
        try {
            const delData = await deleteAddress(dataDel)
            if (delData) {
                (async () => {
                    try {
                        dispatch({
                            type: AlamatAction.SET_MAIN,
                            main_address: !alamatRedux
                        })
                        dispatch({
                            type: DeleteAlamatAction.SET_ID,
                            customer_address_id: false
                        })
                    } catch (e) {
                        console.log(e)
                    }
                })()
            }

        } catch (e) {
            console.log(e)
        }
    }

    const handleBatal = () => {
        dispatch({
            type: DeleteAlamatAction.SET_ID,
            customer_address_id: ''
        })
    }

    return (
        <>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Hapus Alamat
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Apakah anda yakin menghapus data alamat anda? Data anda akan di hapus secara permanen dan tidak dapat dikembalikan
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                    onClick={handleDelete}
                >
                    Hapus
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleBatal}
                >
                    Batal
                </button>
            </div>

        </>
    )
}