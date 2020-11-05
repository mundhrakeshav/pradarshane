pragma solidity ^0.5.0;
import "./ERC721Transferable.sol";
import "./ERC721TransferableOwnable.sol";
import "./ERC721NonTransferable.sol";

contract NFTFactory{

    function createTransferableNFT(string memory name, string memory symbol) public returns(address){
        ERC721Transferable _nftTransferable = new ERC721Transferable(name, symbol);
        return address(_nftTransferable);
    }
    
    
    function createTransferableOwnableNFT(string memory name, string memory symbol) public returns(address){
        ERC721TransferableOwnable _nftTransferableOwnable = new ERC721TransferableOwnable(name, symbol);
        return address(_nftTransferableOwnable);
    }
    
    function createNonTransferableNFT(string memory name, string memory symbol) public returns(address){
        ERC721NonTransferableOwnable _nftNonTransferable = new ERC721NonTransferableOwnable(name, symbol);
        return address(_nftNonTransferable);
    }
    
    
}