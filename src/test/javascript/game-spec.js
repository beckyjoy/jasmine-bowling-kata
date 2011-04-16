describe("A bowling game", function() {
  var game;
  
  beforeEach(function() {
    game = Game();
    this.addMatchers({
      toHaveScore: function(expected) {
        this.message = function() { return "Expected game to have score "+expected+", but had score "+this.actual.score(); }
        return this.actual.score() === expected
      }
    });
  });
  
  describe("a gutter game (all zeroes)", function() {
    beforeEach(function() {
      rollMany(0,20);
    });
    
    it("gives a score of zero", function() {
      expect(game).toHaveScore(0);
    });
  });
  
  describe("all ones", function() {
    beforeEach(function() {
      rollMany(1,20);
    });
    
    it("gives a score of 20", function() {
      expect(game).toHaveScore(20);
    });
  });
  
  describe("a spare", function() {
    beforeEach(function() {
      rollSpare();
      game.roll(3);
      rollMany(0,17);
    });
    
    it("gives a score of 16", function() {
      expect(game).toHaveScore(16);
    });
  });
  
  describe("a strike", function() {
    beforeEach(function() {
      rollStrike();
      game.roll(3);
      game.roll(4)
      rollMany(0,16);
    });
    
    it("gives a score of 24", function() {
      expect(game).toHaveScore(24);
    });
  });
  
  describe("a perfect game", function() {
    beforeEach(function() {
      rollMany(10,12);
    });
    
    it("gives a score of 300", function() {
      expect(game).toHaveScore(300);
    });
  });
  
  describe("uncle bob's example game", function() {
    beforeEach(function() {
      rollALot(
        1,4,
        4,5,
        6,4,
        5,5,
        10,
        0,1,
        7,3,
        6,4,
        10,
        2,8,6);
    });
    
    it("has score 133", function() {
      expect(game).toHaveScore(133);
    });
  });
  
  var rollALot = function() {
    for(var i=0;i<arguments.length;i++) {
      game.roll(arguments[i]);
    }    
  }
  
  var rollMany = function(pins,times) {
    for(var i=0;i<times;i++) {
      game.roll(pins);
    }
  }
  
  var rollSpare = function() {
    game.roll(5);
    game.roll(5);    
  };
  
  var rollStrike = function() {
    game.roll(10);
  }
  
});