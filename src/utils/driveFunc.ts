import * as store from '../store'


export const getURL = async (): Promise<string> => {
    return await store.oAuth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: store.oauth2Data.scopes,
        prompt: 'consent'
    });
}

export const getToken = async (code: any) => {
    // await store.oAuth2Client.getToken(code, callback)
    let token: string = ''
    await store.oAuth2Client.getToken(code,(err: any, token: any)=>{
        if (err){
            console.log(err)
        }
        store.oAuth2Client.setCredentials(token);
        console.log(token.access_token)
        token = token.access_token
    })
    console.log('nyan1')
    return token
}

export const getFolderList = async (folderName: string, parents: any, callback: Function) => {
    await store.drive.files.list({
        q: "name='" + folderName + "'",
        fileds:'nextPageToken, files(id, name)',
        parents: parents
    },callback)
}
