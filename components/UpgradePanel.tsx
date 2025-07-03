import { Upgrade } from '../types';

interface UpgradePanelProps {
  upgrades: Upgrade[];
  onPurchase: (upgrade: Upgrade) => void;
  money: number;
}

export default function UpgradePanel({
  upgrades,
  onPurchase,
  money,
}: UpgradePanelProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Upgrades</h2>
      <div className="space-y-4">
        {upgrades.length > 0 ? (
          upgrades.map((upgrade) => (
            <div
              key={upgrade.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{upgrade.name}</h3>
                <p className="text-sm text-gray-400">{upgrade.description}</p>
                <p className="text-lg font-semibold">${upgrade.cost}</p>
              </div>
              <button
                onClick={() => onPurchase(upgrade)}
                disabled={money < upgrade.cost}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                Buy
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No new upgrades available right now. Keep writing!
          </div>
        )}
      </div>
    </div>
  );
}
