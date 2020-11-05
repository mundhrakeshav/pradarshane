pragma solidity ^0.5.0;
import "./ERC721Transferable.sol";
import "./ERC721TransferableOwnable.sol";
import "./ERC721NonTransferable.sol";

contract NFTFactory{

    struct deployedContracts{
        uint noOfTransferableNFTContracts;
        uint noOfTransferableOwnableNFTContracts;
        uint noOfNonTransferableNFTContracts;
        mapping(uint => address) transferableNFTContractsAddress;
        mapping(uint => address) transferableOwnableNFTContractsAddress;
        mapping(uint => address) nonTransferableNFTContractsAddress;
    }

    mapping(address => deployedContracts) public userContracts;

    function createTransferableNFT(string memory name, string memory symbol) public returns(address){
        ERC721Transferable _nftTransferable = new ERC721Transferable(name, symbol);
        address deployedAddress = address(_nftTransferable);
        deployedContracts storage sendersContracts = userContracts[msg.sender];
        sendersContracts.noOfTransferableNFTContracts += 1;
        sendersContracts.transferableNFTContractsAddress[sendersContracts.noOfTransferableNFTContracts] = deployedAddress;
        return deployedAddress;
    }
    
    
    function createTransferableOwnableNFT(string memory name, string memory symbol) public returns(address){
        ERC721TransferableOwnable _nftTransferableOwnable = new ERC721TransferableOwnable(name, symbol);
        address deployedAddress = address(_nftTransferableOwnable);
        deployedContracts storage sendersContracts = userContracts[msg.sender];
        sendersContracts.noOfTransferableOwnableNFTContracts += 1;
        sendersContracts.transferableOwnableNFTContractsAddress[sendersContracts.noOfTransferableOwnableNFTContracts] = deployedAddress;
        return deployedAddress;
    }
    
    function createNonTransferableNFT(string memory name, string memory symbol) public returns(address){
        ERC721NonTransferableOwnable _nftNonTransferable = new ERC721NonTransferableOwnable(name, symbol);
        address deployedAddress = address(_nftNonTransferable);
        deployedContracts storage sendersContracts = userContracts[msg.sender];
        sendersContracts.noOfNonTransferableNFTContracts += 1;
        sendersContracts.nonTransferableNFTContractsAddress[sendersContracts.noOfNonTransferableNFTContracts] = deployedAddress;
        return deployedAddress;
    }
    
    
}