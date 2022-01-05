import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ListAlamat from './ListAlamat';
import EditAlamat from './EditAlamat';
import DeleteAlamat from './DeleteAlamat';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAlamatAction } from '../../../../store/DeleteAlamat/DeleteAlamatAction';
// import { deleteAddress } from '../../../../utils/apiHandlers';

export default function ShowAlamat({ close }) {
    const dispatch = useDispatch()
    const deleteAlamat = useSelector((state) => state.DeleteAlamatReducer.del)
    useEffect(() => {
        setCek(deleteAlamat)
    }, [deleteAlamat])
    const [id, setId] = useState('')
    const [edit, setEdit] = useState(false)
    const [cek, setCek] = useState(deleteAlamat)
    const [open, setOpen] = useState(true)

    const handleEdit = (data) => {
        if (data !== '') {
            setId(data)
            setEdit(!edit)
        }
    }

    const closeEdit = (data) => {
        setEdit(data)
    }

    const closeModal = (data) => {
        setOpen(data)
        close(false)
    }

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto" onClose={() => { setOpen(false), close(false), dispatch({ type: DeleteAlamatAction.SET_ID, customer_address_id: '', del: false }) }}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <span className="hidden sm:inline-block sm:align-top sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-12 py-12 text-left overflow-auto shadow-xl transform transition-all w-full lg:w-2/5 rounded-lg sm:my-16 sm:align-middle">
                                {cek ? <DeleteAlamat /> : edit ? <EditAlamat close={closeEdit} id={id} /> : <ListAlamat edit={handleEdit} close={closeModal} />}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
