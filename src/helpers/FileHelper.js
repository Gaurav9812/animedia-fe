export const FileTypes= [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/avif",
];
const MAX_UPLOAD_SIZE = 1000000;
const MIN_UPLOAD_SIZE = 100000; 

export const checkIfSizeIsCorrect = (size) => {
        if(size>MAX_UPLOAD_SIZE || size<MIN_UPLOAD_SIZE){
            return {'status':false,'message':`File size should be smaller than ${MAX_UPLOAD_SIZE/1000000} Mb AND greater than ${MIN_UPLOAD_SIZE/10000} kb.`}
        }
        return {'status':true,'message':''}
}

export function returnFileSize(number) {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }
  