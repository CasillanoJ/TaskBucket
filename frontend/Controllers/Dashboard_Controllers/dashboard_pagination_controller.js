
const PaginationController = (skip,limit,status,currentItem)=>{
  const value = GetCookie("isAdmin")

  
  FetchTaskList(skip,limit,status,value)

}