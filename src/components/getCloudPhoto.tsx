import React from 'react'
import * as store from '../store'
import axios, { AxiosInstance } from 'axios'

// interface numberKey{
//     number_key: number
// }

// interface fileObject {
//     id: string,
//     name: string
// }

class GetPhoto extends React.Component<any,any>{

    constructor(
        props: any,
        public getPhotoFiles: any
    ) {
        super(props);
        this.viewFiles = this.viewFiles.bind(this)
        this.getCloudFiles = this.getCloudFiles.bind(this)
        this.render = this.render.bind(this)
        this.getFileName = this.getFileName.bind(this)
        this.state = {
            data: ['none']
        };
    }

    public async getCloudFiles(){
        this.getPhotoFiles = await store.sendGoogleMessage({type:'getCloudPhoto', img: 'none'})
        console.log(this.getPhotoFiles)
    }

    public getFileName(){
        let nameList: any = []
        Array.prototype.forEach.call(this.getPhotoFiles,(element:any) => {
            nameList.push(element.name)
        });
        console.log(nameList)
        return nameList
    }

    public async viewFiles(){
        await this.getCloudFiles()
        let nameList = this.getFileName()
        this.setState({data: nameList})
        console.log(this.state.data)
    }

    public render(){
        return (
            <div>
                {/* <button onClick={this.viewFiles}>test</button> */}
                <button onClick={this.viewFiles}>getPhoto</button>

                    {this.state.data.map((number:any)=>
                        <li key={number}>
                            {number}
                        </li>
                    )}
            </div>
        )
    }

}

export default GetPhoto