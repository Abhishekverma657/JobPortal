import jwt from 'jsonwebtoken'
const isAuthenticated=async(req, res, next)=>{
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ msg: "Not Authenticated" , success:false});
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(!decoded){
                return res.status(401).json({ msg: "Invalid Token ", success:false });
            }
          
            req.id=decoded.user;
           
            next()


    }catch(e){
     console.log(e)
    }
}
 export default isAuthenticated