pragma solidity >=0.4.22 <0.9.0;

contract DTube{
    uint public videoCount=0;
    string public name='DTube';

    mapping(uint => Video) public Videos;
    struct Video{
        uint id;
        string hash;
        string title;
        address author;
    }
    event VideoUploaded(
        uint id,
        string hash,
        string title,
        address author
    );
    constructor() public{
        videoCount++;
        Videos[videoCount]=Video(videoCount,'#123','testing',msg.sender);
    }
    function uploadVideo(string memory _videoHash, string memory _title) public{
        require(bytes(_videoHash).length>0);
        require(bytes(_title).length>0);
        require(msg.sender != address(0));
        videoCount++;
        Videos[videoCount]=Video(videoCount,_videoHash,_title,msg.sender);
        emit VideoUploaded(videoCount,_videoHash,_title,msg.sender);
    }
}
