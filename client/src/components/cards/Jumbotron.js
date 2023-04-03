export default function Jumbotron({title,subtitle,className})
//destructuring title etc., to avoid using props everywhere
{
    return (
        <div className={className} 
        style={{marginTop:"-8px" ,height:"250px"}}>
            <div className="row">
                <div className="col text-center p-5 " 
                style={{borderRadius:"40px",backdropFilter:"blur(2px)",color:"white"}}>
                <h1 className="fw-bold">{title}</h1>
                 <h3>{subtitle}</h3>
                </div>
            </div>
        </div>
    )
        
}

// className="container-fluid jumbotron"