var Game = function(){ 
  var self = {};
  var rolls = [];  
  var currentRoll = 0;
  
  self.roll = function(pins) {
    rolls[currentRoll++] = pins;
  };
  
  self.score = function() {
    var score = 0;
    var frameIndex = 0;
    for (var frame=0; frame < 10; frame++) {
      if(isStrike(frameIndex)){
        score += 10 + strikeBonus(frameIndex);
        frameIndex += 1;
      } else if(isSpare(frameIndex)) {
        score += 10 + spareBonus(frameIndex);
        frameIndex += 2;
      } else {
        score += sumOfBallsInFrame(frameIndex);
        frameIndex += 2;
      }
    };
    return score;
  };
  
  var sumOfBallsInFrame = function(frameIndex) {
    return rolls[frameIndex] + rolls[frameIndex+1];
  };
  
  var spareBonus = function(frameIndex) {
    return rolls[frameIndex+2];
  };
  
  var strikeBonus = function(frameIndex) {
    return rolls[frameIndex+1] + rolls[frameIndex+2];
  };
  
  var isSpare = function(frameIndex) {
    return rolls[frameIndex] + rolls[frameIndex+1] === 10;
  };
  
  var isStrike = function(frameIndex) {
    return rolls[frameIndex] === 10;
  };
  
  return self;
};