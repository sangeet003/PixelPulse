import toast from "react-hot-toast";

export async function upload(obj : any, callbackFn : any){
    if(obj){
            const uploadPromise = new Promise((resolve, reject) => {
            const data = new FormData;
            data.append('avatar', obj.file);
            data.append('user', obj.user.email);
            fetch('/api/user/avatar', {
                method: 'POST',
                body: data,
            }).then(response => {
                if(response.ok){
                    response.json().then(link => {
                        callbackFn(link);
                        resolve(link);
                    });
                }
                else{
                    reject();
                }
                
            });
        });

        await toast.promise(uploadPromise, {
            loading: 'Uploading...',
            success: 'Uploaded!',
            error: 'Upload failed!',
        });
    }
}