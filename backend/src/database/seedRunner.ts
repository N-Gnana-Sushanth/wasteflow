import { db } from './mockDb';

console.log('🌱 Seeding WasteFlow Mock Database...');
db.reset();
console.log(`✅ Seeded ${db.users.length} Users (${db.users.filter(u => u.role === 'citizen').length} citizens, ${db.users.filter(u => u.role === 'driver').length} drivers, etc.)`);
console.log(`✅ Seeded ${db.vehicles.length} Vehicles`);
console.log(`✅ Seeded ${db.bins.length} Smart Bins`);
console.log(`✅ Seeded ${db.pickups.length} Pickup Requests`);
console.log(`✅ Seeded ${db.facilities.length} Circular Waste Facilities`);
console.log(`✅ Seeded ${db.incidents.length} Illegal Dumping Incidents`);
console.log(`✅ Seeded ${db.notifications.length} System Notifications`);
console.log(`✅ Database ready for Full-Stack Hackathon operations.`);
