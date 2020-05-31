pragma solidity >=0.4.21 <0.7.0;

contract Transfer
{
	function transfer(address payable to)
	external payable
	{
		to.transfer(msg.value);
	}
}