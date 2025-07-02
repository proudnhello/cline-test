import { Upgrade } from '../types';

interface UpgradePanelProps {
  upgrades: Upgrade[];
  onPurchase: (upgrade: Upgrade) => void;
}

export default function UpgradePanel({
  upgrades,
  onPurchase,
}: UpgradePanelProps) {
  return (
    <div>
      <h2>Upgrades</h2>
      {upgrades.map((upgrade) => (
        <div key={upgrade.id}>
          <h3>{upgrade.name}</h3>
          <p>{upgrade.description}</p>
          <p>Cost: ${upgrade.cost}</p>
          <button onClick={() => onPurchase(upgrade)}>Buy</button>
        </div>
      ))}
    </div>
  );
}
