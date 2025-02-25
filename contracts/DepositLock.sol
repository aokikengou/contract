// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DepositLock is Ownable {
    mapping(address => bool) public lock;
    mapping(address => uint256) public balances;
    address[] private _depositors;

    constructor(address initialOwner)
        Ownable(initialOwner)
    {}

    /*** DEPOSIT FUNCTIONS ***/
    /**
     * @notice コントラクトに ETH をデポジットする関数
     * @param _depositAmount ユーザーが送金したい金額 (msg.value と一致させる)
     */
    function deposit(uint256 _depositAmount) external payable {
        require(_depositAmount > 0, "DepositAmount must be > 0");
        require(msg.value == _depositAmount, "Sent ETH does not match depositAmount");

        // Depositしている一覧(_depositors)に含まれていない場合、追加
        if (balances[msg.sender] == 0) {
            _depositors.push(msg.sender);
        }
        balances[msg.sender] += msg.value;
    }

    /*** WITHDRAW FUNCTIONS ***/
    /**
     * @notice コントラクトの ETH を引き出す関数
     * @param _amount 引き出したい金額
     */
    function withdraw(uint256 _amount) external {
        require(_amount <= balances[msg.sender], "Insufficient balance");
        require(!lock[msg.sender], "Your withdrawls are Locked");
        balances[msg.sender] -= _amount;
        if (balances[msg.sender] == 0) {
            _removeDepositor(msg.sender);
        }
        payable(msg.sender).transfer(_amount);
    }

    /**
     * @notice withdraw機能をロックする関数
     * @param _addr ロック対象のアドレス
     */
    function lockAddress(address _addr) external onlyOwner {
        lock[_addr] = true;
    }

    /**
     * @notice withdraw機能をロックを解除する関数
     * @param _addr ロック解除対象のアドレス
     */
    function unlockAddress(address _addr) external onlyOwner {
        lock[_addr] = false;
    }

    /**
     * @notice コントラクトが所持しているETH量を返却する関数
     * @return コントラクトが所持しているETH量(wei単位)
     */
    function getContractBalance() external view returns (uint) {
        return address(this).balance;
    }

    /**
     * @notice コントラクトが所持しているUser毎のETH量を返却する関数
     * @param _addr 残高を確認したいアドレス
     * @return コントラクトが所持しているUser毎のETH量(wei単位)
     */
    function getUserBalance(address _addr) external view returns (uint) {
        return balances[_addr];
    }

    /**
     * @notice DepositしているUserのアドレス一覧を返却する関数
     * @return DepositしているUserのアドレス一覧
     */
    function getDepositors() external view returns (address[] memory) {
        uint count = 0;
        for (uint i = 0; i < _depositors.length; i++) {
            if (balances[_depositors[i]] > 0) {
                count++;
            }
        }

        address[] memory activeDepositors = new address[](count);
        count = 0;
        for (uint i = 0; i < _depositors.length; i++) {
            if (balances[_depositors[i]] > 0) {
                activeDepositors[count] = _depositors[i];
                count++;
            }
        }
        return activeDepositors;
    }

    /**
     * @notice 残高が0になったアドレスをDepositしている一覧から削除する関数
     * @param _addr 削除対象のアドレス
     */
    function _removeDepositor(address _addr) internal {
        for (uint i = 0; i < _depositors.length; i++) {
            if (_depositors[i] == _addr) {
                _depositors[i] = _depositors[_depositors.length - 1];
                _depositors.pop();
                break;
            }
        }
    }
}
