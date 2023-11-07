export class CloudinaryService {

    url = "https://api.cloudinary.com/v1_1/";
    cloudName = "dshpkdkq6";
    upload_preset = "l1jek0ag";

    uploadImage = async (file: File) => {
        if (file) {
            const data = new FormData();
            data.append("file", file)
            data.append("upload_preset", this.upload_preset)
            data.append("cloud_name", this.cloudName);

            const res = await fetch(this.url + this.cloudName + "/image/upload",
                {
                    method: "POST",
                    body: data
                })
            const resFile = await res.json();
            console.log(resFile);
            return resFile.secure_url;
        }

    };

}