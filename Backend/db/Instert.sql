-- Standard-Kategorien (Seeding)
INSERT INTO kategorien (name) VALUES ('Haupteinkommen');
INSERT INTO kategorien (name) VALUES ('Nebeneinkommen');
INSERT INTO kategorien (name) VALUES ('Staatliche Leistungen/Transfers');
INSERT INTO kategorien (name) VALUES ('Kapitaleinkünfte');
INSERT INTO kategorien (name) VALUES ('Sonstige Einnahmen');
INSERT INTO kategorien (name) VALUES ('Wohnen');
INSERT INTO kategorien (name) VALUES ('Versicherungen');
INSERT INTO kategorien (name) VALUES ('Mobilität (Fix)');
INSERT INTO kategorien (name) VALUES ('Kommunikation/Medien');
INSERT INTO kategorien (name) VALUES ('Finanzen/Sparen (Fix)');
INSERT INTO kategorien (name) VALUES ('Abonnements/Mitgliedschaften');
INSERT INTO kategorien (name) VALUES ('Lebensmittel & Haushalt');
INSERT INTO kategorien (name) VALUES ('Mobilität (Variabel)');
INSERT INTO kategorien (name) VALUES ('Kleidung & Körperpflege');
INSERT INTO kategorien (name) VALUES ('Gesundheit');
INSERT INTO kategorien (name) VALUES ('Freizeit & Unterhaltung');
INSERT INTO kategorien (name) VALUES ('Kinder/Haustiere');
INSERT INTO kategorien (name) VALUES ('Urlaub & Reisen');
INSERT INTO kategorien (name) VALUES ('Geschenke & Spenden');
INSERT INTO kategorien (name) VALUES ('Sonstiges');

INSERT OR IGNORE INTO sprache (id, sprach_code) VALUES (1, 'DE');

INSERT OR IGNORE INTO einstellung_slots (slot_id, kategorie_id, budget) VALUES 
(1, NULL, 0),
(2, NULL, 0),
(3, NULL, 0),
(4, NULL, 0),
(5, NULL, 0);