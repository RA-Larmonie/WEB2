export class DepartmentEmployee
{
    Id:number[]=[];
    Names:string[]=[];
    counts:number[]=[];

    constructor(){}


    public addDepEmp(id:number,name:string,count:number)
    {
        this.Id.push(id);
        this.Names.push(name);
        this.counts.push(count);
    }
    public getNames():string[]
    {
        return this.Names;
    }
    public getCounts():number[]{
        return this.counts;
    }
    public IncrementCount(id:number)
    {
        let i=this.Id.indexOf(id);
        this.counts[i]+=1;
    }
}