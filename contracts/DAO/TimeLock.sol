// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../node_modules/@openzeppelin/contracts/governance/TimelockController.sol';

contract TimeLock is TimelockController {
    constructor(uint256 _minDelay, address[] memory _proposers, address[] memory _executors, address _token) TimelockController(_minDelay, _proposers, _executors, _token) {
    }
}