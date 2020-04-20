import React from 'react'
import * as store from '../store'


class CloudFileView extends React.Component<any,any>{

    constructor(
        props: any
    ){
        super(props)
        this.state = {
            data: ['none']
        }
        this.render = this.render.bind(this)
    }

    componentDidMount(){
        this.getFileList()
    }

    public getFileName(apiRes: any){
        let nameList: any = []
        Array.prototype.forEach.call(apiRes.data.files,(element:any) => {
            nameList.push(element.name)
        });
        console.log(nameList)
        this.setState({data: nameList})
    }

    public async getFileList(){
        let res = await store.drive.files.list({
            pageSize: 10,
            files: 'nextPageToken, files(id, name)'
        })
        // let res = await store.googleApi.getFilesList()
        // console.log(res)
        this.getFileName(res)
    }

    public render(){
        return(
            <div>
                    {this.state.data.map((number:any)=>
                        <li key={number}>
                            {number}
                        </li>
                    )}
            </div>
        )
    }
}

export default CloudFileView