export interface Signup{
  name:string,
  email:string,
  password:string
}
export interface Login{
  email:string,
  password:string
}
export interface Dress{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number,
  Quantity:undefined | number,
  customerId:undefined |number,
  dressId:undefined | number

}
export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number | undefined,
  Quantity:undefined | number,
  customerId:number,
  dressId:number
}
export interface priceinformation{
  price:number,
  gst:number,
  tax:number,
  total:number,
  delivery:number,
  discount:number
}
export interface order {
  email:string,
  address:string,
  mobile:string,
  totalamount:number,
  customerId:string,
  id:number|undefined
}
