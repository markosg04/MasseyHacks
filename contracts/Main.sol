pragma solidity >=0.4.21 <0.7.0;

contract Main {
    
    //Ipfs thing
  string storedData;

  function set(string memory x) public {
    storedData = x;
  }

  function get() public view returns (string memory) {
    return storedData;
  }
 
  function () external payable {

  }
  
  struct eligibleDrivers {
      address[] drivers;
      uint256 amount;
      address payable finalDriver;
      bool userConfirmation;
      bool driverConfirmation;
      bool pendingStatus;
      
  }
  
  mapping(address => eligibleDrivers) driverTable; 
  
  function clearDrivers(address _address) private {
    delete driverTable[_address].drivers;
  }
  
  function finalizeDriver(address payable _driver, address _user) public {
      driverTable[_user].finalDriver = _driver;
      clearDrivers(_user);
      driverTable[_user].pendingStatus = false;
  }
  
  function addEligibleDriver(address _driver) public {
      driverTable[msg.sender].drivers.push(_driver);
      driverTable[msg.sender].userConfirmation = false;
      driverTable[msg.sender].driverConfirmation = false;
      driverTable[msg.sender].pendingStatus = true;
  }
  
  function returnDriverArray(address _user) public view returns (address[] memory) {
      return driverTable[_user].drivers;
  }
  
  function setUserConfirmation(address _user) public {
      require (driverTable[_user].finalDriver != address(0));
      driverTable[_user].userConfirmation = true;
  }

  function setCost(address _user, uint256 _amount) public {
      require (driverTable[_user].amount == 0);
      driverTable[_user].amount == _amount;
  }
  
  function setDriverConfimation(address _user) public {
      require (driverTable[_user].finalDriver != address(0));
      driverTable[_user].driverConfirmation = true;
  }
  
  function clearPendingStatus(address _user) public {
      require (driverTable[_user].finalDriver != address(0));
      driverTable[_user].pendingStatus = false;
  }
  
  function finalizeTrip(address _user) public payable {
      require (driverTable[_user].userConfirmation == true);
      require (driverTable[_user].driverConfirmation == true);
      require (driverTable[_user].pendingStatus == false);
      require (address(this).balance >= driverTable[_user].amount);
      driverTable[_user].finalDriver.transfer(driverTable[_user].amount);
      driverTable[_user].userConfirmation == false;
      driverTable[_user].driverConfirmation == false;
      driverTable[_user].finalDriver = address(0);
      driverTable[_user].amount = 0;
      
      
  }
  
  
}
