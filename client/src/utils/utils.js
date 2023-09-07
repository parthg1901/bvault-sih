const getBase64 = (file, fn) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
        fn(reader.result.split(",")[1])
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

module.exports = { getBase64 }