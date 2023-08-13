// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

import "./lzApp/NonblockingLzApp.sol";

abstract contract  EyepayContract is NonblockingLzApp {

    string public data;
    
    // A uint16 variable named "destChainId" is declared to hold the LayerZero Chain Id of the destination blockchain.
    uint16 destChainId;
    
    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}

    function  _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory _address ) internal override {
               
       data = abi.decode(_address, (string));
    }

    function send(string memory _address,  uint16 _destChainId) public payable {

        bytes memory payload = abi.encode(_address);
        
        _lzSend(_destChainId, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
    }


    function trustAddress(address _otherContract) public onlyOwner {
        trustedRemoteLookup[destChainId] = abi.encodePacked(_otherContract, address(this));   
    }

    function estimateFees(uint16 dstChainId, bytes calldata adapterParams, string memory _message) public view returns (uint nativeFee, uint zroFee) {
        
        bytes memory payload = abi.encode(_message);        
       
        return lzEndpoint.estimateFees(dstChainId, address(this), payload, false, adapterParams);
    }
}
