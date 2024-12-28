/* 
数据库元数据表
key: 元数据键
value: 元数据值
*/
CREATE TABLE IF NOT EXISTS metadata (key TEXT, value TEXT);

INSERT
OR IGNORE INTO metadata (key, value)
VALUES
  ('version', '1.0.0'),
  ('createAt', CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  nickname TEXT
);

INSERT
OR IGNORE INTO user (username, password, nickname)
VALUES
  ('admin', 'admin', '管理员'),
  ('test', 'test', '测试用户'),
  ('guest1', 'guest1', '游客1'),
  ('guest2', 'guest2', '游客2'),
  ('guest3', 'guest3', '游客3'),
  ('guest4', 'guest4', '游客4'),
  ('guest5', 'guest5', '游客5'),
  ('guest6', 'guest6', '游客6'),
  ('guest7', 'guest7', '游客7'),
  ('guest8', 'guest8', '游客8'),
  ('guest9', 'guest9', '游客9'),
  ('guest10', 'guest10', '游客10'),
  ('guest11', 'guest11', '游客11'),
  ('guest12', 'guest12', '游客12'),
  ('guest13', 'guest13', '游客13'),
  ('guest14', 'guest14', '游客14'),
  ('guest15', 'guest15', '游客15'),
  ('guest16', 'guest16', '游客16'),
  ('guest17', 'guest17', '游客17'),
  ('guest18', 'guest18', '游客18'),
  ('guest19', 'guest19', '游客19'),
  ('guest20', 'guest20', '游客20'),
  ('guest21', 'guest21', '游客21'),
  ('guest22', 'guest22', '游客22'),
  ('guest23', 'guest23', '游客23'),
  ('guest24', 'guest24', '游客24'),
  ('guest25', 'guest25', '游客25'),
  ('guest26', 'guest26', '游客26'),
  ('guest27', 'guest27', '游客27'),
  ('guest28', 'guest28', '游客28'),
  ('guest29', 'guest29', '游客29'),
  ('guest30', 'guest30', '游客30'),
  ('guest31', 'guest31', '游客31'),
  ('guest32', 'guest32', '游客32'),
  ('guest33', 'guest33', '游客33'),
  ('guest34', 'guest34', '游客34'),
  ('guest35', 'guest35', '游客35'),
  ('guest36', 'guest36', '游客36'),
  ('guest37', 'guest37', '游客37'),
  ('guest38', 'guest38', '游客38'),
  ('guest39', 'guest39', '游客39'),
  ('guest40', 'guest40', '游客40'),
  ('guest41', 'guest41', '游客41'),
  ('guest42', 'guest42', '游客42'),
  ('guest43', 'guest43', '游客43'),
  ('guest44', 'guest44', '游客44'),
  ('guest45', 'guest45', '游客45'),
  ('guest46', 'guest46', '游客46'),
  ('guest47', 'guest47', '游客47'),
  ('guest48', 'guest48', '游客48'),
  ('guest49', 'guest49', '游客49'),
  ('guest50', 'guest50', '游客50'),
  ('guest51', 'guest51', '游客51'),
  ('guest52', 'guest52', '游客52'),
  ('guest53', 'guest53', '游客53'),
  ('guest54', 'guest54', '游客54'),
  ('guest55', 'guest55', '游客55'),
  ('guest56', 'guest56', '游客56'),
  ('guest57', 'guest57', '游客57'),
  ('guest58', 'guest58', '游客58'),
  ('guest59', 'guest59', '游客59'),
  ('guest60', 'guest60', '游客60'),
  ('guest61', 'guest61', '游客61'),
  ('guest62', 'guest62', '游客62'),
  ('guest63', 'guest63', '游客63'),
  ('guest64', 'guest64', '游客64'),
  ('guest65', 'guest65', '游客65'),
  ('guest66', 'guest66', '游客66'),
  ('guest67', 'guest67', '游客67'),
  ('guest68', 'guest68', '游客68'),
  ('guest69', 'guest69', '游客69'),
  ('guest70', 'guest70', '游客70'),
  ('guest71', 'guest71', '游客71'),
  ('guest72', 'guest72', '游客72'),
  ('guest73', 'guest73', '游客73'),
  ('guest74', 'guest74', '游客74'),
  ('guest75', 'guest75', '游客75'),
  ('guest76', 'guest76', '游客76'),
  ('guest77', 'guest77', '游客77'),
  ('guest78', 'guest78', '游客78'),
  ('guest79', 'guest79', '游客79'),
  ('guest80', 'guest80', '游客80'),
  ('guest81', 'guest81', '游客81');

CREATE TABLE IF NOT EXISTS role (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  createAt TEXT,
  updateAt TEXT
);

INSERT
OR IGNORE INTO role (name, createAt, updateAt)
VALUES
  ('admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);