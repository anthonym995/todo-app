

const apiRequest = async (URL,optionObj = null,errMsg =null) => {
 
    try {
        const response = await fetch(URL, optionObj);
        if (!response.ok) throw Error("Please reload the page");
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

export default apiRequest