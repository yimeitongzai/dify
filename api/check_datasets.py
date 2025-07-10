from extensions.ext_database import db
from models.dataset import Dataset
from models.account import Account

account = db.session.query(Account).first()
tenant_id = account.current_tenant.id
datasets = db.session.query(Dataset).filter_by(tenant_id=tenant_id).all()

print(f"Tenant ID: {tenant_id}")
print(f"Total datasets: {len(datasets)}")
print(f"External datasets: {len([d for d in datasets if d.provider == 'external'])}")

for d in datasets[:3]:
    print(f"- {d.name} (provider: {d.provider})")
