import React from 'react'

function Main(props) {
    return (
        
    <div className="container-fluid text-monospace">
      <br></br>
      &nbsp;
      <br></br>
        <div className="row">
          <div className="col-md-10">
            <div className="embed-responsive embed-responsive-16by9" style={{ maxHeight: '768px'}}>
              <video src={props.currentHash}  controls />
            </div>
            <h3><b>{props.currentTitle} </b></h3>
          </div>
          <div className="col-md-2 overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px' }}>
            <h5><b>Share Video </b></h5>
            <form onSubmit={(event) => {
              event.preventDefault();
              props.uploadVideo(props.videoTitle) ;

            }} >
              &nbsp;
              <input type='file' accept='video/*' onChange={props.captureFile} style={{width:'250px'}} />
              <div className="form-group mr-sm-2">
                <input 
                id='videoTitle' 
                type='text'
                className='form-control-sm'
                placeholder='Title...'
                onChange={props.inputHandler}    
                value={props.videoTitle}            
                required
                />
              </div>
              <button type='submit' className='btn btn-danger btn-block btn-sm' >Upload!</button>
              &nbsp;
            </form>
            { props.videos.map((video, key) => {
              return(
                <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px'}} key={key} >
                  <div className="card-title bg-dark">
                    <small className="text-white"><b>{video.title}</b></small>
                  </div>
                  <div>
                     <p onClick={() => props.changeVideo(video.hash, video.title)}> 
                      <video
                        src={video.hash}
                        style={{ width: '150px' }}
                      />
                     </p> 
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
        
    )
}

export default Main
