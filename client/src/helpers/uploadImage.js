const api = `https://api.cloudinary.com/v1_1/dwdtjp8rz/image/upload`
const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "Ecommerce_project")
    const dataResponse = await fetch(api, {
        method: "post",
        body: formData

    })

    return dataResponse.json()
}

export default uploadImage