const mysql=require('mysql');

const conn=mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
})

exports.view=(req,res)=>{
    conn.getConnection((err,connection)=>{
            if(err){
                throw err
            }
            connection.query("select * from users",(err,rows)=>{
                connection.release();
                if(!err){
                    res.render("home",{rows});
                }
                else{
                    console.log(err);
                }
            })
        })
}


exports.adduser=(req,res)=>{
    res.render("adduser");
}

exports.save=(req,res)=>{
    conn.getConnection((err,connection)=>{
        if(err){
            throw err
        }
        const{name,age,city}=req.body;
        connection.query("insert into users (NAME,AGE,CITY) values (?,?,?)",[name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:"User Details Added Success"});
            }
            else{
                console.log(err);
            }
        })
    })
}

exports.edituser=(req,res)=>{
    conn.getConnection((err,connection)=>{
        if(err){
            throw err
        }
        let id=req.params.id;
        connection.query("select * from users where ID=?",[id],(err,rows)=>{
            connection.release();

            if(!err){
                res.render("edituser",{rows});
            }
            else{
                console.log(err);
            }
        })
    })
}

exports.edit=(req,res)=>{
    conn.getConnection((err,connection)=>{
        if(err){
            throw err
        }
        const{name,age,city}=req.body;
        let id=req.params.id;
        connection.query("update users set NAME=?,AGE=?,CITY=? where ID=?",[name,age,city,id],(err,rows)=>{
            connection.release();
            if(!err){
                conn.getConnection((err,connection)=>{
                    if(err){
                        throw err
                    }
                    let id=req.params.id;
                    connection.query("select * from users where ID=?",[id],(err,rows)=>{
                        connection.release();
            
                        if(!err){
                            res.render("edituser",{rows,msg:"User Details updated Success"});
                        }
                        else{
                            console.log(err);
                        }
                    })
                })
            }
            else{
                console.log(err);
            }
        })
    })
}

exports.deleteuser=(req,res)=>{
    conn.getConnection((err,connection)=>{
        if(err) throw err
        let id=req.params.id;
        connection.query("delete from users where ID=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");
            }else{
                console.log(err);
            }
        })
    })
}