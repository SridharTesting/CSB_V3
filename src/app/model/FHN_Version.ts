export class FHNVersion {
    // appType:string;
    author:string;
    versionNum:number;
    createdDate:string;
    description:string;
    orgId:number;
    selectview:number;
    versionId:number;



    constructor(
      author?:string,
    versionNum?:number,
    createdDate?:string,
    description?:string,
    orgId?:number,
    selectview?:number,
    versionId?:number,
    ){
      this.author=author;
    this.versionNum=versionNum;
    this.createdDate=createdDate;
    this.description=description;
    this.orgId=orgId;
    this.selectview=selectview;
    this.versionId=versionId;

    }

    /**
     *
     */



}
