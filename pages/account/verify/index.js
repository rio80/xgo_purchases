import * as React from 'react'
import Loader from 'react-loader-spinner';
import { activatedEmail } from "../../../utils/apiHandlers";
import { useRouter } from 'next/router';

export default function VerifyAccount(props){
    const router = useRouter()
    const { expires, hash, id, signature } = props
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const getData = await activatedEmail(expires, hash, id, signature);
                if(getData.data.status){
                    router.push('/login')
                }
            } catch (e) {
                console.log(e)
            }
        })();
        setLoading(false)
    }, []);


    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <Loader type="ThreeDots" color="#00BFFF" className="text-center justify-center flex mt-20" height={80} width={80} />
            </div>
        )
    }
    return(
        <></>
    )
}

VerifyAccount.getInitialProps = async ctx => {
    const { query } = ctx;
    return {
        expires: query ? query.expires : '',
        hash: query ? query.hash : '',
        id: query ? query.id : '',
        signature: query ? query.signature : '',
    };
};