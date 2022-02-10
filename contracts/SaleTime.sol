// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SaleTime is Ownable {
    uint256 public preSalesStartTime = 1644469200;
    uint256 public preSalesEndTime = 1644476400;
    uint256 public publicSalesStartTime = 1644480000;

    constructor() {}

    modifier isPreSalesStarted() {
        require(checkPreSales(), "Pre sales not started yet");
        _;
    }

    modifier isPublicSalesStarted() {
        require(checkPublicSales(), "Public sales not started yet");
        _;
    }

    function checkPreSales() public view returns (bool) {
        return
            preSalesStartTime > 0 &&
            preSalesEndTime > 0 &&
            block.timestamp >= preSalesStartTime &&
            block.timestamp <= preSalesEndTime;
    }

    function checkPublicSales() public view returns (bool) {
        return
            publicSalesStartTime > 0 && block.timestamp >= publicSalesStartTime;
    }

    // unix epoch time in second
    function setPreSalesTime(uint256 _startTime, uint256 _endTime)
        external
        onlyOwner
    {
        require(
            _endTime >= _startTime,
            "SaleTime: End time should be later than start time"
        );
        preSalesStartTime = _startTime;
        preSalesEndTime = _endTime;
    }

    // unix epoch time in second
    function setPublicSalesTime(uint256 _startTime) external onlyOwner {
        publicSalesStartTime = _startTime;
    }
}
