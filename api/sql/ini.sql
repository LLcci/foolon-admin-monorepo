/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80200
 Source Host           : localhost:3306
 Source Schema         : foolon-admin

 Target Server Type    : MySQL
 Target Server Version : 80200
 File Encoding         : 65001

 Date: 20/08/2024 16:24:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建用户id',
  `update_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新用户id',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parent_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '父菜单id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单路径',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组件路径',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `menu_type` tinyint(0) NOT NULL COMMENT '菜单类型:0-一级菜单,1-子菜单,2-权限',
  `perms` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '权限',
  `sort` int(0) NOT NULL DEFAULT 1 COMMENT '排序',
  `keepalive` tinyint(0) NOT NULL DEFAULT 1 COMMENT '是否缓存:0-不缓存,1-缓存',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '是否启用:0-停用,1-启用',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_b78075022af82852f74a4cf97b`(`status`) USING BTREE,
  INDEX `IDX_99a1997ca558690a71799ba4ff`(`menu_type`) USING BTREE,
  INDEX `IDX_53f8853c709995d10bb117d469`(`sort`) USING BTREE,
  INDEX `IDX_78cf12ef035f39b115840f5856`(`keepalive`) USING BTREE,
  INDEX `IDX_085d58d2af25967eb24756516a`(`create_time`) USING BTREE,
  INDEX `IDX_20fbd0b3c91e7812ec3f110c07`(`update_time`) USING BTREE,
  INDEX `IDX_9b06fe89dc3a5bb37346e15cf7`(`create_user_id`) USING BTREE,
  INDEX `IDX_8078ca080cd6a797a0f36f4ae1`(`update_user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('2024-08-15 11:17:14.812432', '2024-08-15 11:17:14.812432', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '005ebfb3-bacf-4ed3-ba39-98bd09be6bcc', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '队列管理', '/sys/SysQueues', '/sys/SysQueues.vue', NULL, 1, NULL, 4, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-07-16 15:08:30.310090', '2024-07-16 15:08:52.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '141cddc1-59f4-436d-b34c-876dc76c533d', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '在线用户', '/sys/SysOnline', '/sys/SysOnline.vue', NULL, 1, NULL, 3, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-19 16:09:19.589392', '2024-08-19 16:09:19.589392', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '2623a9db-a451-4b7b-bbd5-e5a100236746', '70693226-7afe-47bb-9f91-3a0597e8a707', '新增编辑', NULL, NULL, NULL, 2, '/admin/sys/task/save', 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-26 15:18:56.114806', '2024-03-01 11:26:35.000000', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'ad59b6ce-18e3-46cb-815f-179159402b57', '2701d412-108b-4864-8a98-b44abeb0ed6a', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '菜单管理', '/sys/SysMenu', '/sys/SysMenu.vue', '', 1, NULL, 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-07-16 15:09:19.045036', '2024-07-16 15:09:19.045036', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '2a60bb81-950d-45ab-91fe-e0c3a7c993b6', '141cddc1-59f4-436d-b34c-876dc76c533d', '查询', NULL, NULL, NULL, 2, '/admin/sys/online/list', 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:49:37.798756', '2024-02-29 16:50:02.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '2caad99d-a738-4622-af40-cbbe344d4549', 'dc955259-11c2-468a-a45c-95da7beec342', '查询', NULL, NULL, NULL, 2, '/admin/sys/role/page,/admin/sys/role/id', 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:48:45.626399', '2024-02-29 16:48:52.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '359da62f-5cef-4be8-8877-984efe18437f', 'dc955259-11c2-468a-a45c-95da7beec342', '删除', NULL, NULL, NULL, 2, '/admin/sys/role/delete', 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-09 16:49:39.027498', '2024-08-19 16:07:51.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '3af426df-2a2c-4fd1-9706-d00cfa7a39a8', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '图片上传', NULL, NULL, NULL, 2, '/admin/sys/upload/img', 6, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-01 11:22:45.472380', '2024-08-01 11:22:59.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '3d880f35-908b-4152-a1fc-bea73f68e90e', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '角色列表', NULL, NULL, NULL, 2, '/admin/sys/role/list', 5, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-07-30 16:07:20.692576', '2024-08-01 11:23:12.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '3e71d37b-fb1c-4fd3-8a24-84e707ef7536', '2701d412-108b-4864-8a98-b44abeb0ed6a', '权限列表', NULL, NULL, NULL, 2, '/admin/sys/menu/routes,/admin/sys/menu/list', 3, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-03-14 16:45:55.092706', '2024-03-14 16:48:03.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '4a594cfb-cec6-436c-9d04-0148546d5ed0', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '新增', NULL, NULL, NULL, 2, '/admin/sys/user/create,/admin/sys/user/import', 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:47:14.155895', '2024-02-29 16:47:14.155895', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '539d486c-e0f2-41f0-aaca-d58f81008421', '2701d412-108b-4864-8a98-b44abeb0ed6a', '新增修改', NULL, NULL, NULL, 2, '/admin/sys/menu/save,/admin/sys/menu/import', 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-19 16:08:23.201797', '2024-08-19 16:08:23.201797', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '70693226-7afe-47bb-9f91-3a0597e8a707', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '定时任务', '/sys/SysTask', '/sys/SysTask.vue', NULL, 1, NULL, 5, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:51:22.714482', '2024-02-29 16:51:22.714482', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '7cb2d261-000e-4d66-9587-a1d1f346f74c', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '查询', NULL, NULL, NULL, 2, '/admin/sys/user/page,/admin/sys/user/id', 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-26 15:19:30.239868', '2024-02-26 15:19:30.239868', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '用户管理', '/sys/SysUser', '/sys/SysUser.vue', NULL, 1, NULL, 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-09 16:50:30.069227', '2024-08-19 16:07:59.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '8c4dda14-fc6d-46d6-8df9-5d12b4ac277e', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '文件删除', NULL, NULL, NULL, 2, '/admin/sys/upload/delete', 8, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-03-15 11:56:39.667480', '2024-03-15 11:56:39.667480', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '8f48a1cd-5ba5-40a8-a9e2-6aa791a47217', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '修改密码', NULL, NULL, NULL, 2, '/admin/sys/user/password', 4, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-19 16:10:49.878656', '2024-08-19 16:10:49.878656', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '90f4798f-3717-4be2-a7ad-933482bb4ae5', '70693226-7afe-47bb-9f91-3a0597e8a707', '启用停用', NULL, NULL, NULL, 2, '/admin/sys/task/start,/admin/sys/task/stop', 4, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-15 11:22:36.447459', '2024-08-15 11:22:36.447459', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '924cc081-8eb3-411c-a0f1-b6ec99ad66a9', '005ebfb3-bacf-4ed3-ba39-98bd09be6bcc', '新增', NULL, NULL, NULL, 2, '/admin/sys/queues/add', 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-27 16:08:49.647997', '2024-02-27 16:08:49.647997', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9336c0e8-8add-41f9-8d7e-e8cb9cdda060', 'bd39b140-850a-460f-ac0a-921f6cfc8168', '表单Demo', '/demo/SchemaFormDemo', '/demo/SchemaFormDemo.vue', NULL, 1, NULL, 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:50:56.290508', '2024-02-29 16:50:59.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '97ffaade-20cb-48eb-a10b-82587a91f888', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '删除', NULL, NULL, NULL, 2, '/admin/sys/user/delete', 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-19 16:08:54.046471', '2024-08-19 16:08:54.046471', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '9a5368f7-31c2-4f14-b73f-de4919db41c4', '70693226-7afe-47bb-9f91-3a0597e8a707', '查询', NULL, NULL, NULL, 2, '/admin/sys/task/page,/admin/sys/task/id', 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-15 11:24:31.708929', '2024-08-15 11:24:37.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '9bbed2c5-be9e-4b81-8693-fb2dbf2f9f44', '005ebfb3-bacf-4ed3-ba39-98bd09be6bcc', '详情', NULL, NULL, NULL, 2, '/admin/sys/queues/id', 3, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-26 15:18:38.908273', '2024-03-01 11:06:36.000000', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'ad59b6ce-18e3-46cb-815f-179159402b57', '9c7fdede-3078-4937-aaad-eb4499d9f25f', NULL, '系统设置', '/sys', NULL, 'Setting', 0, NULL, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-16 14:49:34.265783', '2024-08-19 16:07:22.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '9db9f002-9fb1-499f-9c27-d7eda2d6c823', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '获取消费者方法', NULL, NULL, NULL, 2, '/admin/sys/queues/consumerMethod', 7, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-19 16:10:30.925819', '2024-08-19 16:10:30.925819', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '9e407cbe-b1f8-42d1-ab2d-1e07aa2f26e3', '70693226-7afe-47bb-9f91-3a0597e8a707', '导入导出', NULL, NULL, NULL, 2, '/admin/sys/task/import,/admin/sys/task/list', 3, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-15 11:23:00.494197', '2024-08-15 11:23:00.494197', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'a38f8630-a0cb-4780-aa2e-4d8998b3f9ff', '005ebfb3-bacf-4ed3-ba39-98bd09be6bcc', '删除', NULL, NULL, NULL, 2, '/admin/sys/queues/remove', 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-27 16:09:04.822472', '2024-02-27 16:09:04.822472', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'a765d1c0-8c95-420f-8054-dec6049b1f34', 'bd39b140-850a-460f-ac0a-921f6cfc8168', '表格Demo', '/demo/SchemaTableDemo', '/demo/SchemaTableDemo.vue', NULL, 1, NULL, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:47:55.942824', '2024-02-29 16:49:07.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'b7c4e78e-b01c-4e17-9457-affedbe49f51', '2701d412-108b-4864-8a98-b44abeb0ed6a', '删除', NULL, NULL, NULL, 2, '/admin/sys/menu/delete', 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-27 16:08:19.544955', '2024-03-01 11:06:28.000000', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'bd39b140-850a-460f-ac0a-921f6cfc8168', NULL, '组件Demo', '/demo', NULL, 'DataBoard', 0, NULL, 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-19 16:09:40.081073', '2024-08-19 16:09:49.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'bed15929-e8b3-4721-978f-272e606e7dfc', '70693226-7afe-47bb-9f91-3a0597e8a707', '删除', NULL, NULL, NULL, 2, '/admin/sys/task/delete', 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:47:34.472196', '2024-02-29 16:49:46.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'cfce0604-de8a-4e2b-a8b4-882462a27fd2', '2701d412-108b-4864-8a98-b44abeb0ed6a', '查询', NULL, NULL, NULL, 2, '/admin/sys/menu/page,/admin/sys/menu/id', 2, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-26 15:19:14.787369', '2024-02-26 15:19:14.787369', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'dc955259-11c2-468a-a45c-95da7beec342', '9c7fdede-3078-4937-aaad-eb4499d9f25f', '角色管理', '/sys/SysRole', '/sys/SysRole.vue', NULL, 1, NULL, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-15 11:22:10.770678', '2024-08-15 11:22:10.770678', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'e56ba0ca-c155-4454-bd83-bed743054d71', '005ebfb3-bacf-4ed3-ba39-98bd09be6bcc', '查询', NULL, NULL, NULL, 2, '/admin/sys/queues/page', 0, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-03-14 16:46:19.269447', '2024-03-14 16:46:19.269447', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'f4e93bd3-f5f3-4449-9668-53307e23c603', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '修改', NULL, NULL, NULL, 2, '/admin/sys/user/update', 3, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-08-16 15:29:49.531374', '2024-08-16 15:30:02.000000', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'f548315b-97f1-433e-a5d2-afa0d3cb9e4b', '8b9e25b8-a7ff-4562-885a-79eed8d1f456', '查询用户列表', NULL, NULL, NULL, 2, '/admin/sys/user/list', 6, 1, 1);
INSERT INTO `sys_menu` VALUES ('2024-02-29 16:48:20.535785', '2024-02-29 16:48:20.535785', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'f5820fc4-8df3-4907-b353-47d9aa6811dc', 'dc955259-11c2-468a-a45c-95da7beec342', '新增修改', NULL, NULL, NULL, 2, '/admin/sys/role/save,/admin/sys/role/import', 0, 1, 1);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建用户id',
  `update_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新用户id',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色描述',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '是否启用:0-停用,1-启用',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_5618342313765224322c7e317d`(`status`) USING BTREE,
  INDEX `IDX_223de54d6badbe43a5490450c3`(`name`) USING BTREE,
  INDEX `IDX_747ca2fd9bccec50e13e17abfa`(`create_time`) USING BTREE,
  INDEX `IDX_8edf424cc351f2d64c61cd0375`(`update_time`) USING BTREE,
  INDEX `IDX_749b6dc5b4f285453040a2786f`(`create_user_id`) USING BTREE,
  INDEX `IDX_255376a085d8b938aa59194448`(`update_user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('2024-02-28 09:13:18.032904', '2024-02-28 09:13:18.032904', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', '8e418709-fea2-4e64-be29-59035533cee9', 'admin', NULL, 1);

-- ----------------------------
-- Table structure for sys_role_menus_sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menus_sys_menu`;
CREATE TABLE `sys_role_menus_sys_menu`  (
  `sysRoleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sysMenuId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`sysRoleId`, `sysMenuId`) USING BTREE,
  INDEX `IDX_e7c90b5f1eae0da649c74cfbcb`(`sysRoleId`) USING BTREE,
  INDEX `IDX_c6e4b76cb3f4ab1028f2461963`(`sysMenuId`) USING BTREE,
  CONSTRAINT `FK_c6e4b76cb3f4ab1028f24619635` FOREIGN KEY (`sysMenuId`) REFERENCES `sys_menu` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_e7c90b5f1eae0da649c74cfbcb4` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menus_sys_menu
-- ----------------------------
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '005ebfb3-bacf-4ed3-ba39-98bd09be6bcc');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '141cddc1-59f4-436d-b34c-876dc76c533d');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '2623a9db-a451-4b7b-bbd5-e5a100236746');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '2701d412-108b-4864-8a98-b44abeb0ed6a');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '2a60bb81-950d-45ab-91fe-e0c3a7c993b6');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '2caad99d-a738-4622-af40-cbbe344d4549');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '359da62f-5cef-4be8-8877-984efe18437f');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '3af426df-2a2c-4fd1-9706-d00cfa7a39a8');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '3d880f35-908b-4152-a1fc-bea73f68e90e');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '3e71d37b-fb1c-4fd3-8a24-84e707ef7536');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '4a594cfb-cec6-436c-9d04-0148546d5ed0');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '539d486c-e0f2-41f0-aaca-d58f81008421');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '70693226-7afe-47bb-9f91-3a0597e8a707');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '7cb2d261-000e-4d66-9587-a1d1f346f74c');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '8b9e25b8-a7ff-4562-885a-79eed8d1f456');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '8c4dda14-fc6d-46d6-8df9-5d12b4ac277e');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '8f48a1cd-5ba5-40a8-a9e2-6aa791a47217');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '90f4798f-3717-4be2-a7ad-933482bb4ae5');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '924cc081-8eb3-411c-a0f1-b6ec99ad66a9');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '9336c0e8-8add-41f9-8d7e-e8cb9cdda060');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '97ffaade-20cb-48eb-a10b-82587a91f888');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '9a5368f7-31c2-4f14-b73f-de4919db41c4');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '9bbed2c5-be9e-4b81-8693-fb2dbf2f9f44');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '9c7fdede-3078-4937-aaad-eb4499d9f25f');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '9db9f002-9fb1-499f-9c27-d7eda2d6c823');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', '9e407cbe-b1f8-42d1-ab2d-1e07aa2f26e3');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'a38f8630-a0cb-4780-aa2e-4d8998b3f9ff');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'a765d1c0-8c95-420f-8054-dec6049b1f34');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'b7c4e78e-b01c-4e17-9457-affedbe49f51');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'bd39b140-850a-460f-ac0a-921f6cfc8168');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'bed15929-e8b3-4721-978f-272e606e7dfc');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'cfce0604-de8a-4e2b-a8b4-882462a27fd2');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'dc955259-11c2-468a-a45c-95da7beec342');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'e56ba0ca-c155-4454-bd83-bed743054d71');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'f4e93bd3-f5f3-4449-9668-53307e23c603');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'f548315b-97f1-433e-a5d2-afa0d3cb9e4b');
INSERT INTO `sys_role_menus_sys_menu` VALUES ('8e418709-fea2-4e64-be29-59035533cee9', 'f5820fc4-8df3-4907-b353-47d9aa6811dc');

-- ----------------------------
-- Table structure for sys_task
-- ----------------------------
DROP TABLE IF EXISTS `sys_task`;
CREATE TABLE `sys_task`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建用户id',
  `update_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新用户id',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '任务名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '任务描述',
  `cron` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'cron表达式',
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '任务方法',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '是否启用:0-停用,1-启用',
  `data` json NULL COMMENT '传递参数',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_71fd4ca5e691875e8069f79a3a`(`create_time`) USING BTREE,
  INDEX `IDX_8662070292440acae4db44cdc8`(`update_time`) USING BTREE,
  INDEX `IDX_37bf781886ac6832033cbea3a9`(`create_user_id`) USING BTREE,
  INDEX `IDX_031d1bca21c7710151d6d8848c`(`update_user_id`) USING BTREE,
  INDEX `IDX_ef8e5ab5ef2fe0ddb1428439ef`(`name`) USING BTREE,
  INDEX `IDX_077447a51cb5d19f85100bfaef`(`status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_task
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建用户id',
  `update_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新用户id',
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户账户',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `realname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码盐',
  `iv` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '初始向量',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `status` tinyint(0) NOT NULL DEFAULT 1 COMMENT '状态:0-无效,1-有效',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_9e7164b2f1ea1348bc0eb0a7da`(`username`) USING BTREE,
  INDEX `IDX_b835ec13e31aaa3894be4ac1c4`(`realname`) USING BTREE,
  INDEX `IDX_a78066266d5da92bbaf1f70cf8`(`email`) USING BTREE,
  INDEX `IDX_7bef5cdb09432b1dfc46a063ce`(`phone`) USING BTREE,
  INDEX `IDX_a27798b84ae100a441a2f42e5e`(`status`) USING BTREE,
  INDEX `IDX_66f49d131ca428c3811af9c663`(`create_time`) USING BTREE,
  INDEX `IDX_515145930f5eae28b734458a84`(`update_time`) USING BTREE,
  INDEX `IDX_b280416329a3b30493967ca67c`(`create_user_id`) USING BTREE,
  INDEX `IDX_b47b4dc956c2d5df549a7b691e`(`update_user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('2024-02-27 16:02:03.690395', '2024-08-09 16:51:32.000000', '9f71ebdb-283a-4cd0-886b-3075ffbd66fa', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'ad59b6ce-18e3-46cb-815f-179159402b57', 'admin', 'bba5489f9ceededdfe470c9ed6f5b847', '超级管理员', 'f6c7e53c4d2d4231192a475d3e0acd8a', '68cc4276388c2658e3a4960c7e4ec29a', 'img-1723193489076-637328967.webp', '', '', 1);

-- ----------------------------
-- Table structure for sys_user_roles_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_roles_sys_role`;
CREATE TABLE `sys_user_roles_sys_role`  (
  `sysUserId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sysRoleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`sysUserId`, `sysRoleId`) USING BTREE,
  INDEX `IDX_d1daac450217c1a1e384e99254`(`sysUserId`) USING BTREE,
  INDEX `IDX_45602f09af1715f5532db91a43`(`sysRoleId`) USING BTREE,
  CONSTRAINT `FK_45602f09af1715f5532db91a43d` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_d1daac450217c1a1e384e99254a` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_roles_sys_role
-- ----------------------------
INSERT INTO `sys_user_roles_sys_role` VALUES ('ad59b6ce-18e3-46cb-815f-179159402b57', '8e418709-fea2-4e64-be29-59035533cee9');

SET FOREIGN_KEY_CHECKS = 1;
