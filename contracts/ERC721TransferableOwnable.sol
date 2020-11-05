pragma solidity ^0.5.0;

contract ERC721TransferableOwnable{
    
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;
    
    address public contractOwner;
    
    struct TokenMetaData{
     string tokenUniqueName;
     string ipfsHash;
     uint tokenPriceUSD;
    }    
    
    
    mapping(address => uint) private balances;
    mapping(uint256 => address) private tokenOwners;
    mapping(uint256 => bool) private tokenExists;
    mapping(address => mapping (address => uint256)) allowed;
    mapping(address => mapping(uint256 => uint256)) private ownerTokens;
    mapping(uint => TokenMetaData) private tokenData; 

    
    event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);
    event Transfer(address indexed _owner, address indexed _approved, uint256 _tokenId);

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Sender isnt owner");
        _;
    }

    constructor(string memory name, string memory symbol) public {
        _name = name;
        _symbol = symbol;
        _totalSupply = 0;
        contractOwner = msg.sender;
    }
    
    function transferOwnerShip(address _to) public onlyOwner {
        contractOwner = _to;
    }
    
    function name() public view returns (string memory) {
        return _name;
    }
    
    function symbol() public view returns (string memory) {
        return _symbol;
    }
    
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
    
     function balanceOf(address _owner) public view returns (uint balance) {
        return balances[_owner];
    }
    
    function ownerOf(uint256 _tokenId) public view returns (address owner) {
        require(tokenExists[_tokenId]);
        return tokenOwners[_tokenId];
    }
    
    function approve(address _to, uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId));
        require(msg.sender != _to);
        allowed[msg.sender][_to] = _tokenId;
        emit Approval(msg.sender, _to, _tokenId);
    }
    
    function takeOwnership(uint256 _tokenId) public {
        require(tokenExists[_tokenId]);
        address oldOwner = ownerOf(_tokenId);
        address newOwner = msg.sender;
        require(newOwner != oldOwner);
        require(allowed[oldOwner][newOwner] == _tokenId);
        balances[oldOwner] -= 1;
        tokenOwners[_tokenId] = newOwner;
        balances[newOwner] += 1;
        emit Transfer(oldOwner, newOwner, _tokenId);
    }
    
    
    function tokenOfOwnerByIndex(address _owner, uint256 _index) public view returns (uint tokenId){
        return ownerTokens[_owner][_index];
    }
    
    
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public payable{
        require(tokenExists[_tokenId],"Token doesn't exists.");
        address oldOwner = ownerOf(_tokenId);
        require(oldOwner == _from,"from address doesnt holds token.");
        address newOwner = _to;
        require(newOwner != oldOwner,"newOwner = oldOwner not allowed" );
        require(allowed[oldOwner][msg.sender] == _tokenId, "you are not allowed to transfer");
        balances[oldOwner] -= 1;
        tokenOwners[_tokenId] = newOwner;
        balances[newOwner] += 1;
        emit Transfer(oldOwner, newOwner, _tokenId);
    }
    
    function safeTransferFromCustodial(address _from, address _to, uint256 _tokenId) public payable onlyOwner{
        require(tokenExists[_tokenId],"Token doesn't exists.");
        address oldOwner = ownerOf(_tokenId);
        require(oldOwner == _from,"from address doesnt holds token.");
        address newOwner = _to;
        require(newOwner != oldOwner,"newOwner = oldOwner not allowed" );
        balances[oldOwner] -= 1;
        tokenOwners[_tokenId] = newOwner;
        balances[newOwner] += 1;
        emit Transfer(oldOwner, newOwner, _tokenId);
    }
    
    function send(address _to, uint256 _tokenId) public payable {
        require(tokenExists[_tokenId],"Token doesn't exists.");
        address oldOwner = ownerOf(_tokenId);
        require(oldOwner == msg.sender,"sender should be owner.");
        address newOwner = _to;
        require(newOwner != oldOwner,"newOwner = oldOwner not allowed" );
        balances[oldOwner] -= 1;
        tokenOwners[_tokenId] = newOwner;
        balances[newOwner] += 1;
        emit Transfer(oldOwner, newOwner, _tokenId);
    }
     
    function mintToken(address _to, string memory _tokenName, string memory _ipfsHash, uint _tokenPriceUSD) public onlyOwner{
        _totalSupply++;
        TokenMetaData memory _tokenData = TokenMetaData(_tokenName, _ipfsHash, _tokenPriceUSD);
        tokenData[_totalSupply] = _tokenData;
        balances[_to] = balances[_to] + 1; 
        tokenOwners[_totalSupply] = _to;
        tokenExists[_totalSupply] = true;
        ownerTokens[_to][balances[_to]] = _totalSupply;
    }
}