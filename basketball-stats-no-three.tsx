import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { RotateCcw, Dribbble } from 'lucide-react';

const BasketballStats = () => {
  const [stats, setStats] = useState({
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    fouls: 0,
    twoPointers: { made: 0, attempts: 0 },
    freeThrows: { made: 0, attempts: 0 }
  });

  const calculatePercentage = (made, attempts) => {
    if (attempts === 0) return '0%';
    return `${((made / attempts) * 100).toFixed(1)}%`;
  };

  const increment = (stat, subStat = null) => {
    setStats(prev => {
      if (subStat) {
        return {
          ...prev,
          [stat]: {
            ...prev[stat],
            [subStat]: prev[stat][subStat] + 1
          }
        };
      }
      return {
        ...prev,
        [stat]: prev[stat] + 1
      };
    });
  };

  const handleShot = (made) => {
    setStats(prev => ({
      ...prev,
      points: prev.points + (made ? 2 : 0),
      twoPointers: {
        made: prev.twoPointers.made + (made ? 1 : 0),
        attempts: prev.twoPointers.attempts + 1
      }
    }));
  };

  const handleFreeThrow = (made) => {
    setStats(prev => ({
      ...prev,
      points: prev.points + (made ? 1 : 0),
      freeThrows: {
        made: prev.freeThrows.made + (made ? 1 : 0),
        attempts: prev.freeThrows.attempts + 1
      }
    }));
  };

  const resetStats = () => {
    if (window.confirm('Réinitialiser toutes les statistiques ?')) {
      setStats({
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        fouls: 0,
        twoPointers: { made: 0, attempts: 0 },
        freeThrows: { made: 0, attempts: 0 }
      });
    }
  };

  const ActionButton = ({ onClick, color, children }) => (
    <button
      onClick={onClick}
      className={`${color} w-full py-8 rounded-xl text-white font-bold text-2xl shadow-md active:transform active:scale-95 transition-transform touch-manipulation`}
    >
      {children}
    </button>
  );

  const QuickStatButton = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="bg-gray-100 py-6 w-full rounded-xl font-bold text-xl hover:bg-gray-200 active:bg-gray-300 transition-colors touch-manipulation"
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4 max-w-md mx-auto">
      {/* Header avec score */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <Dribbble className="text-purple-600" size={36} />
          <h1 className="text-4xl font-bold">{stats.points} pts</h1>
        </div>
        <button 
          onClick={resetStats}
          className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 touch-manipulation"
        >
          <RotateCcw size={28} />
        </button>
      </div>

      {/* Tirs à 2 points */}
      <Card className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">TIRS</h2>
          <div className="text-xl font-medium">
            {stats.twoPointers.made}/{stats.twoPointers.attempts}
            {' '}
            ({calculatePercentage(stats.twoPointers.made, stats.twoPointers.attempts)})
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ActionButton
            onClick={() => handleShot(true)}
            color="bg-green-500 hover:bg-green-600"
          >
            +2 Réussi
          </ActionButton>
          <ActionButton
            onClick={() => handleShot(false)}
            color="bg-red-500 hover:bg-red-600"
          >
            Raté
          </ActionButton>
        </div>
      </Card>

      {/* Lancers francs */}
      <Card className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">LANCERS FRANCS</h2>
          <div className="text-xl font-medium">
            {stats.freeThrows.made}/{stats.freeThrows.attempts}
            {' '}
            ({calculatePercentage(stats.freeThrows.made, stats.freeThrows.attempts)})
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ActionButton
            onClick={() => handleFreeThrow(true)}
            color="bg-green-500 hover:bg-green-600"
          >
            +1 Réussi
          </ActionButton>
          <ActionButton
            onClick={() => handleFreeThrow(false)}
            color="bg-red-500 hover:bg-red-600"
          >
            Raté
          </ActionButton>
        </div>
      </Card>

      {/* Autres statistiques */}
      <Card className="p-4 space-y-4">
        <h2 className="text-2xl font-bold">AUTRES STATS</h2>
        <div className="grid grid-cols-2 gap-3">
          <QuickStatButton
            label={`REB (${stats.rebounds})`}
            onClick={() => increment('rebounds')}
          />
          <QuickStatButton
            label={`AST (${stats.assists})`}
            onClick={() => increment('assists')}
          />
          <QuickStatButton
            label={`INT (${stats.steals})`}
            onClick={() => increment('steals')}
          />
          <QuickStatButton
            label={`BLK (${stats.blocks})`}
            onClick={() => increment('blocks')}
          />
          <QuickStatButton
            label={`FTE (${stats.fouls})`}
            onClick={() => increment('fouls')}
          />
        </div>
      </Card>
    </div>
  );
};

export default BasketballStats;