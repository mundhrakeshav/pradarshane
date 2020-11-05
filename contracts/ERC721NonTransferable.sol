pragma solidity ^0.5.0;

contract ERC721NonTransferableOwnable{
    
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;
    
    address public contractOwner;
    
    mapping(address => uint) private balances;
    mapping(uint256 => address) private tokenOwners;
    mapping(uint256 => bool) private tokenExists;
    mapping(address => mapping (address => uint256)) allowed;
    mapping(address => mapping(uint256 => uint256)) private ownerTokens;
    
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

    
    function tokenOfOwnerByIndex(address _owner, uint256 _index) public view returns (uint tokenId){
        return ownerTokens[_owner][_index];
    }

    function mintToken( address _to) public onlyOwner{
        _totalSupply++;
        balances[_to] = balances[_to] + 1; 
        tokenOwners[_totalSupply] = _to;
        tokenExists[_totalSupply] = true;
        ownerTokens[_to][balances[_to]] = _totalSupply;
    }
}