/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/admin/sys/user/page': {
    /** 分页用户列表 */
    post: operations['UserController_getUserPageList']
  }
  '/admin/sys/user/list': {
    /** 用户列表 */
    post: operations['UserController_getUserList']
  }
  '/admin/sys/user/create': {
    /** 创建用户 */
    post: operations['UserController_createUser']
  }
  '/admin/sys/user/update': {
    /** 更新用户 */
    post: operations['UserController_updateUser']
  }
  '/admin/sys/user/password': {
    /** 更新用户密码 */
    post: operations['UserController_updatePassword']
  }
  '/admin/sys/user/import': {
    /** 导入用户 */
    post: operations['UserController_importUser']
  }
  '/admin/sys/user/id': {
    /** id查询用户详情 */
    get: operations['UserController_getUserById']
  }
  '/admin/sys/user/delete': {
    /** id删除用户 */
    post: operations['UserController_deleteUserById']
  }
  '/admin/sys/login': {
    /** 登录 */
    post: operations['LoginController_login']
  }
  '/admin/sys/login/code': {
    /** 获取验证码 */
    get: operations['LoginController_getCode']
  }
  '/admin/sys/menu/page': {
    /** 分页菜单列表 */
    post: operations['MenuController_getMenuPageList']
  }
  '/admin/sys/menu/list': {
    /** 菜单列表 */
    post: operations['MenuController_getMenuList']
  }
  '/admin/sys/menu/save': {
    /** 保存菜单 */
    post: operations['MenuController_saveMenu']
  }
  '/admin/sys/menu/import': {
    /** 导入菜单 */
    post: operations['MenuController_importMenu']
  }
  '/admin/sys/menu/id': {
    /** id查询菜单详情 */
    get: operations['MenuController_getMenuById']
  }
  '/admin/sys/menu/delete': {
    /** id删除菜单 */
    post: operations['MenuController_deleteMenuById']
  }
  '/admin/sys/menu/routes': {
    /** 获取路由 */
    get: operations['MenuController_getRoutes']
  }
  '/admin/sys/role/page': {
    /** 分页角色列表 */
    post: operations['RoleController_getRolePageList']
  }
  '/admin/sys/role/list': {
    /** 角色列表 */
    post: operations['RoleController_getRoleList']
  }
  '/admin/sys/role/save': {
    /** 保存角色 */
    post: operations['RoleController_saveRole']
  }
  '/admin/sys/role/import': {
    /** 导入角色 */
    post: operations['RoleController_importRole']
  }
  '/admin/sys/role/id': {
    /** id查询角色详情 */
    get: operations['RoleController_getRoleById']
  }
  '/admin/sys/role/delete': {
    /** id删除角色 */
    post: operations['RoleController_deleteRoleById']
  }
  '/admin/sys/permission': {
    /** 获取用户权限 */
    get: operations['PermissionController_getPermission']
  }
  '/admin/sys/permission/userInfo': {
    /** 更新用户信息 */
    post: operations['PermissionController_updateUserInfo']
  }
  '/admin/sys/permission/updatePassword': {
    /** 修改用户密码 */
    post: operations['PermissionController_updatePassword']
  }
  '/admin/sys/logout': {
    /** 登出 */
    get: operations['LogoutController_logout']
  }
  '/admin/sys/online/list': {
    /** 分页在线用户列表 */
    post: operations['OnlineController_getOnlineUserList']
  }
  '/admin/sys/upload/img': {
    /** 上传图片 */
    post: operations['UploadController_upload']
  }
  '/admin/sys/upload/delete': {
    get: operations['UploadController_deleteAvatar']
  }
  '/admin/sys/queues/add': {
    /** 添加工作 */
    post: operations['QueuesController_addJob']
  }
  '/admin/sys/queues/remove': {
    /** 移除工作 */
    post: operations['QueuesController_removeJob']
  }
  '/admin/sys/queues/page': {
    /** 分页获取工作 */
    post: operations['QueuesController_getJobPage']
  }
  '/admin/sys/queues/id': {
    /** 根据ID获取工作 */
    get: operations['QueuesController_getJobById']
  }
  '/admin/sys/queues/consumerMethod': {
    /** 获取消费者方法 */
    get: operations['QueuesController_getConsumerMethod']
  }
  '/admin/sys/task/page': {
    /** 分页定时任务列表 */
    post: operations['TaskController_getTaskPageList']
  }
  '/admin/sys/task/list': {
    /** 定时任务列表 */
    post: operations['TaskController_getTaskList']
  }
  '/admin/sys/task/save': {
    /** 保存定时任务 */
    post: operations['TaskController_saveTask']
  }
  '/admin/sys/task/import': {
    /** 导入定时任务 */
    post: operations['TaskController_importTask']
  }
  '/admin/sys/task/id': {
    /** id查询定时任务详情 */
    get: operations['TaskController_getTaskById']
  }
  '/admin/sys/task/delete': {
    /** id删除定时任务 */
    post: operations['TaskController_deleteTaskById']
  }
  '/admin/sys/task/start': {
    /** 启动定时任务 */
    get: operations['TaskController_startTask']
  }
  '/admin/sys/task/stop': {
    /** 停止定时任务 */
    get: operations['TaskController_stopTask']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    PageResultDto: {
      /** @description 当前页码 */
      currentPage: number
      /** @description 每页条数 */
      pageSize: number
      /** @description 总条数 */
      total: number
    }
    MenuEntity: {
      /** Format: date-time */
      createTime?: string
      /** Format: date-time */
      updateTime?: string
      createUserId?: string
      updateUserId?: string
      /** @description 菜单id,新增时不需要传,更新时需要传 */
      id?: string
      /** @description 父菜单id */
      parentId?: string
      /** @description 名称:类型为菜单时必填 */
      name?: string
      /** @description 路由页面时必填 */
      path?: string
      /** @description 路由页面时必填 */
      component?: string
      /** @description 菜单图标 */
      icon?: string
      /**
       * @description 菜单类型:0-一级菜单,1-子菜单,2-权限,3-外部链接
       * @enum {number}
       */
      menuType: 0 | 1 | 2 | 3
      /** @description 类型为权限时必填 */
      perms?: string[]
      /**
       * @description 打开方式:0-内部打开,1-外部打开，类型为外部链接时必填
       * @enum {number}
       */
      openType?: 0 | 1
      /** @description 排序 */
      sort: number
      /**
       * @description 是否缓存:0-不缓存,1-缓存
       * @default 1
       */
      keepalive?: number
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
    }
    RoleEntity: {
      /** Format: date-time */
      createTime?: string
      /** Format: date-time */
      updateTime?: string
      createUserId?: string
      updateUserId?: string
      /** @description 角色id,新增时不需要传,更新时需要传 */
      id?: string
      /** @description 角色名称,查询时非必传,新增更新时必传 */
      name?: string
      /** @description 角色描述 */
      description?: string
      /** @description 菜单列表 */
      menus: readonly components['schemas']['MenuEntity'][]
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
    }
    UserEntity: {
      /** Format: date-time */
      createTime?: string
      /** Format: date-time */
      updateTime?: string
      createUserId?: string
      updateUserId?: string
      /** @description 用户id,新增时不需要传,更新时必传 */
      id?: string
      /** @description 用户账户,查询时非必传,新增更新时必传 */
      username?: string
      /** @description 密码 */
      password: string
      /** @description 用户名,查询时非必传,新增更新时必传 */
      realname?: string
      /** @description 头像 */
      avatar?: string
      /** @description 邮箱 */
      email?: string
      /** @description 手机号 */
      phone?: string
      /** @description 角色列表 */
      roles: readonly components['schemas']['RoleEntity'][]
      /** @description 状态:0-无效,1-有效 */
      status?: number
    }
    UserPageListDto: {
      /**
       * @description 当前页码
       * @default 1
       */
      currentPage?: number
      /**
       * @description 页大小
       * @default 10
       */
      pageSize?: number
      /** @description 用户账户,查询时非必传,新增更新时必传 */
      username?: string
      /** @description 用户名,查询时非必传,新增更新时必传 */
      realname?: string
      /** @description 状态:0-无效,1-有效 */
      status?: number
    }
    UserCreateDto: {
      /** Format: date-time */
      createTime?: string
      /** Format: date-time */
      updateTime?: string
      createUserId?: string
      updateUserId?: string
      /** @description 用户账户,查询时非必传,新增更新时必传 */
      username?: string
      /** @description 密码 */
      password: string
      /** @description 用户名,查询时非必传,新增更新时必传 */
      realname?: string
      /** @description 头像 */
      avatar?: string
      /** @description 邮箱 */
      email?: string
      /** @description 手机号 */
      phone?: string
      /** @description 状态:0-无效,1-有效 */
      status?: number
      /** @description 角色ids */
      roleIds?: string[]
    }
    UserUpdateDto: {
      /** Format: date-time */
      createTime?: string
      /** Format: date-time */
      updateTime?: string
      createUserId?: string
      updateUserId?: string
      /** @description 用户id,新增时不需要传,更新时必传 */
      id?: string
      /** @description 用户名,查询时非必传,新增更新时必传 */
      realname?: string
      /** @description 头像 */
      avatar?: string
      /** @description 邮箱 */
      email?: string
      /** @description 手机号 */
      phone?: string
      /** @description 状态:0-无效,1-有效 */
      status?: number
      /** @description 角色ids */
      roleIds?: string[]
    }
    UpdatePasswordDto: {
      /** @description 用户id */
      id: string
      /** @description 密码 */
      password: string
      /** @description 确认密码 */
      confirmPassword: string
    }
    UserImportDto: {
      /** @description 用户列表 */
      list: components['schemas']['UserCreateDto'][]
    }
    UserSelectDto: {
      /** Format: date-time */
      createTime?: string
      /** Format: date-time */
      updateTime?: string
      createUserId?: string
      updateUserId?: string
      /** @description 用户id,新增时不需要传,更新时必传 */
      id?: string
      /** @description 用户账户,查询时非必传,新增更新时必传 */
      username?: string
      /** @description 用户名,查询时非必传,新增更新时必传 */
      realname?: string
      /** @description 头像 */
      avatar?: string
      /** @description 邮箱 */
      email?: string
      /** @description 手机号 */
      phone?: string
      /** @description 状态:0-无效,1-有效 */
      status?: number
      /** @description 角色ids */
      roleIds?: string[]
    }
    DeleteResult: Record<string, never>
    LoginDto: {
      /** @description 用户账户,查询时非必传,新增更新时必传 */
      username?: string
      /** @description 密码 */
      password: string
      /** @description 验证码 */
      code: string
      /** @description 验证码id */
      codeId: string
    }
    Token: {
      /** @description Token */
      token: string
    }
    Code: {
      /** @description 验证码SVG */
      img: string
      /** @description 唯一id */
      id: string
    }
    MenuTree: {
      /** Format: date-time */
      createTime?: string
      /** Format: date-time */
      updateTime?: string
      createUserId?: string
      updateUserId?: string
      /** @description 菜单id,新增时不需要传,更新时需要传 */
      id?: string
      /** @description 父菜单id */
      parentId?: string
      /** @description 名称:类型为菜单时必填 */
      name?: string
      /** @description 路由页面时必填 */
      path?: string
      /** @description 路由页面时必填 */
      component?: string
      /** @description 菜单图标 */
      icon?: string
      /**
       * @description 菜单类型:0-一级菜单,1-子菜单,2-权限,3-外部链接
       * @enum {number}
       */
      menuType: 0 | 1 | 2 | 3
      /** @description 类型为权限时必填 */
      perms?: string[]
      /**
       * @description 打开方式:0-内部打开,1-外部打开，类型为外部链接时必填
       * @enum {number}
       */
      openType?: 0 | 1
      /** @description 排序 */
      sort: number
      /**
       * @description 是否缓存:0-不缓存,1-缓存
       * @default 1
       */
      keepalive?: number
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
      /** @description 子菜单数 */
      children: components['schemas']['MenuTree'][]
    }
    MenuPageListDto: {
      /**
       * @description 当前页码
       * @default 1
       */
      currentPage?: number
      /**
       * @description 页大小
       * @default 10
       */
      pageSize?: number
      /** @description 名称:类型为菜单时必填 */
      name?: string
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
    }
    MenuSaveDto: {
      /** @description 菜单列表 */
      list: components['schemas']['MenuEntity'][]
    }
    RolePageListDto: {
      /**
       * @description 当前页码
       * @default 1
       */
      currentPage?: number
      /**
       * @description 页大小
       * @default 10
       */
      pageSize?: number
      /** @description 角色名称,查询时非必传,新增更新时必传 */
      name?: string
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
    }
    RoleSaveDto: {
      /** Format: date-time */
      createTime?: string
      /** Format: date-time */
      updateTime?: string
      createUserId?: string
      updateUserId?: string
      /** @description 角色id,新增时不需要传,更新时需要传 */
      id?: string
      /** @description 角色名称,查询时非必传,新增更新时必传 */
      name?: string
      /** @description 角色描述 */
      description?: string
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
      /** @description 菜单ID列表 */
      menuIds?: string[]
    }
    RoleImportDto: {
      /** @description 角色列表 */
      list: components['schemas']['RoleSaveDto'][]
    }
    UpdateUserInfoDto: {
      /** @description 用户名,查询时非必传,新增更新时必传 */
      realname?: string
      /** @description 头像 */
      avatar?: string
      /** @description 邮箱 */
      email?: string
      /** @description 手机号 */
      phone?: string
    }
    UpdateResult: Record<string, never>
    UpdateUserPasswordDto: {
      /** @description 原密码 */
      oldPassword: string
      /** @description 新密码 */
      newPassword: string
      /** @description 确认新密码 */
      confirmPassword: string
    }
    OnlineUserDto: {
      /** @description 用户id,新增时不需要传,更新时必传 */
      id?: string
      /** @description 用户账户,查询时非必传,新增更新时必传 */
      username?: string
      /** @description 用户名,查询时非必传,新增更新时必传 */
      realname?: string
      /** @description 头像 */
      avatar?: string
      /** @description 登录时间 */
      loginDate: string
      /** @description ip地址 */
      address: string
    }
    OnlineUserPageListDto: {
      /**
       * @description 当前页码
       * @default 1
       */
      currentPage?: number
      /**
       * @description 页大小
       * @default 10
       */
      pageSize?: number
      /** @description 用户账户,查询时非必传,新增更新时必传 */
      username?: string
      /** @description 用户名,查询时非必传,新增更新时必传 */
      realname?: string
    }
    UploadDto: {
      /** Format: binary */
      file: string
    }
    JobDto: {
      /** @description 工作名称 */
      name: string
      /** @description 消费者方法 */
      method: string
      /** @description 通知用户 */
      notifier?: string
      /** @description 传递参数 */
      data: Record<string, never>
      /** @description 工作配置 */
      opts?: Record<string, never>
    }
    Job: Record<string, never>
    JobPageDto: {
      /**
       * @description 当前页码
       * @default 1
       */
      currentPage?: number
      /**
       * @description 页大小
       * @default 10
       */
      pageSize?: number
      /** @description 工作名称 */
      name?: string
      /** @description 工作类型 */
      state?: string
    }
    TaskEntity: {
      /** Format: date-time */
      createTime?: string
      /** Format: date-time */
      updateTime?: string
      createUserId?: string
      updateUserId?: string
      /** @description id,新增时不需要传,更新时需要传 */
      id?: string
      /** @description 查询时非必传,新增更新时需要传 */
      name?: string
      /** @description 任务描述 */
      description?: string
      /** @description cron表达式 */
      cron: string
      /** @description 任务方法 */
      method: string
      /** @description 传递参数 */
      data?: Record<string, never>
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
    }
    TaskPageListDto: {
      /**
       * @description 当前页码
       * @default 1
       */
      currentPage?: number
      /**
       * @description 页大小
       * @default 10
       */
      pageSize?: number
      /** @description 查询时非必传,新增更新时需要传 */
      name?: string
      /**
       * @description 是否启用:0-停用,1-启用
       * @default 1
       */
      status?: number
    }
    TaskImportDto: {
      /** @description 定时任务列表 */
      list: components['schemas']['TaskEntity'][]
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  /** 分页用户列表 */
  UserController_getUserPageList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UserPageListDto']
      }
    }
    responses: {
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto'] & {
            records: components['schemas']['UserEntity'][]
          }
        }
      }
    }
  }
  /** 用户列表 */
  UserController_getUserList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UserPageListDto']
      }
    }
    responses: {
      /** @description 用户列表 */
      200: {
        content: {
          'application/json': components['schemas']['UserEntity'][]
        }
      }
    }
  }
  /** 创建用户 */
  UserController_createUser: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UserCreateDto']
      }
    }
    responses: {
      201: {
        content: never
      }
    }
  }
  /** 更新用户 */
  UserController_updateUser: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UserUpdateDto']
      }
    }
    responses: {
      201: {
        content: never
      }
    }
  }
  /** 更新用户密码 */
  UserController_updatePassword: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdatePasswordDto']
      }
    }
    responses: {
      201: {
        content: never
      }
    }
  }
  /** 导入用户 */
  UserController_importUser: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UserImportDto']
      }
    }
    responses: {
      201: {
        content: never
      }
    }
  }
  /** id查询用户详情 */
  UserController_getUserById: {
    parameters: {
      query: {
        id: string
      }
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id查询用户详情 */
      200: {
        content: {
          'application/json': components['schemas']['UserSelectDto']
        }
      }
    }
  }
  /** id删除用户 */
  UserController_deleteUserById: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id删除用户 */
      200: {
        content: {
          'application/json': components['schemas']['DeleteResult']
        }
      }
    }
  }
  /** 登录 */
  LoginController_login: {
    requestBody: {
      content: {
        'application/json': components['schemas']['LoginDto']
      }
    }
    responses: {
      /** @description 登录成功 */
      200: {
        content: {
          'application/json': components['schemas']['Token']
        }
      }
    }
  }
  /** 获取验证码 */
  LoginController_getCode: {
    responses: {
      /** @description 获取验证码成功 */
      200: {
        content: {
          'application/json': components['schemas']['Code']
        }
      }
    }
  }
  /** 分页菜单列表 */
  MenuController_getMenuPageList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['MenuPageListDto']
      }
    }
    responses: {
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto'] & {
            records: components['schemas']['MenuTree'][]
          }
        }
      }
    }
  }
  /** 菜单列表 */
  MenuController_getMenuList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['MenuPageListDto']
      }
    }
    responses: {
      /** @description 菜单列表 */
      200: {
        content: {
          'application/json': components['schemas']['MenuEntity'][]
        }
      }
    }
  }
  /** 保存菜单 */
  MenuController_saveMenu: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['MenuEntity']
      }
    }
    responses: {
      /** @description 保存菜单 */
      200: {
        content: {
          'application/json': components['schemas']['MenuEntity']
        }
      }
    }
  }
  /** 导入菜单 */
  MenuController_importMenu: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['MenuSaveDto']
      }
    }
    responses: {
      /** @description 导入菜单 */
      200: {
        content: {
          'application/json': components['schemas']['MenuEntity'][]
        }
      }
    }
  }
  /** id查询菜单详情 */
  MenuController_getMenuById: {
    parameters: {
      query: {
        id: string
      }
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id查询菜单详情 */
      200: {
        content: {
          'application/json': components['schemas']['MenuEntity']
        }
      }
    }
  }
  /** id删除菜单 */
  MenuController_deleteMenuById: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id删除菜单 */
      200: {
        content: {
          'application/json': components['schemas']['DeleteResult']
        }
      }
    }
  }
  /** 获取路由 */
  MenuController_getRoutes: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description 获取路由 */
      200: {
        content: {
          'application/json': string[]
        }
      }
    }
  }
  /** 分页角色列表 */
  RoleController_getRolePageList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['RolePageListDto']
      }
    }
    responses: {
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto'] & {
            records: components['schemas']['RoleEntity'][]
          }
        }
      }
    }
  }
  /** 角色列表 */
  RoleController_getRoleList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['RolePageListDto']
      }
    }
    responses: {
      /** @description 角色列表 */
      200: {
        content: {
          'application/json': components['schemas']['RoleEntity'][]
        }
      }
    }
  }
  /** 保存角色 */
  RoleController_saveRole: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['RoleSaveDto']
      }
    }
    responses: {
      /** @description 保存角色 */
      200: {
        content: {
          'application/json': components['schemas']['RoleEntity']
        }
      }
    }
  }
  /** 导入角色 */
  RoleController_importRole: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['RoleImportDto']
      }
    }
    responses: {
      /** @description 导入角色 */
      200: {
        content: {
          'application/json': components['schemas']['RoleEntity'][]
        }
      }
    }
  }
  /** id查询角色详情 */
  RoleController_getRoleById: {
    parameters: {
      query: {
        id: string
      }
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id查询角色详情 */
      200: {
        content: {
          'application/json': components['schemas']['RoleSaveDto']
        }
      }
    }
  }
  /** id删除角色 */
  RoleController_deleteRoleById: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id删除角色 */
      200: {
        content: {
          'application/json': components['schemas']['DeleteResult']
        }
      }
    }
  }
  /** 获取用户权限 */
  PermissionController_getPermission: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description 用户权限 */
      200: {
        content: {
          'application/json': components['schemas']['UserEntity']
        }
      }
    }
  }
  /** 更新用户信息 */
  PermissionController_updateUserInfo: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateUserInfoDto']
      }
    }
    responses: {
      /** @description 用户信息 */
      200: {
        content: {
          'application/json': components['schemas']['UpdateResult']
        }
      }
    }
  }
  /** 修改用户密码 */
  PermissionController_updatePassword: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdateUserPasswordDto']
      }
    }
    responses: {
      /** @description 修改用户密码 */
      200: {
        content: {
          'application/json': components['schemas']['UpdateResult']
        }
      }
    }
  }
  /** 登出 */
  LogoutController_logout: {
    responses: {
      /** @description 登出 */
      200: {
        content: never
      }
    }
  }
  /** 分页在线用户列表 */
  OnlineController_getOnlineUserList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['OnlineUserPageListDto']
      }
    }
    responses: {
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto'] & {
            records: components['schemas']['OnlineUserDto'][]
          }
        }
      }
    }
  }
  /** 上传图片 */
  UploadController_upload: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    /** @description Upload file */
    requestBody: {
      content: {
        'multipart/form-data': components['schemas']['UploadDto']
      }
    }
    responses: {
      201: {
        content: never
      }
    }
  }
  UploadController_deleteAvatar: {
    parameters: {
      query: {
        filename: string
      }
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      200: {
        content: never
      }
    }
  }
  /** 添加工作 */
  QueuesController_addJob: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['JobDto']
      }
    }
    responses: {
      201: {
        content: never
      }
    }
  }
  /** 移除工作 */
  QueuesController_removeJob: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      201: {
        content: never
      }
    }
  }
  /** 分页获取工作 */
  QueuesController_getJobPage: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['JobPageDto']
      }
    }
    responses: {
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto'] & {
            records: components['schemas']['Job'][]
          }
        }
      }
    }
  }
  /** 根据ID获取工作 */
  QueuesController_getJobById: {
    parameters: {
      query: {
        id: string
      }
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      200: {
        content: {
          'application/json': components['schemas']['Job']
        }
      }
    }
  }
  /** 获取消费者方法 */
  QueuesController_getConsumerMethod: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      200: {
        content: {
          'application/json': string[]
        }
      }
    }
  }
  /** 分页定时任务列表 */
  TaskController_getTaskPageList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['TaskPageListDto']
      }
    }
    responses: {
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto'] & {
            records: components['schemas']['TaskEntity'][]
          }
        }
      }
    }
  }
  /** 定时任务列表 */
  TaskController_getTaskList: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['TaskPageListDto']
      }
    }
    responses: {
      /** @description 定时任务列表 */
      200: {
        content: {
          'application/json': components['schemas']['TaskEntity'][]
        }
      }
    }
  }
  /** 保存定时任务 */
  TaskController_saveTask: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['TaskEntity']
      }
    }
    responses: {
      /** @description 保存定时任务 */
      200: {
        content: {
          'application/json': components['schemas']['TaskEntity']
        }
      }
    }
  }
  /** 导入定时任务 */
  TaskController_importTask: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['TaskImportDto']
      }
    }
    responses: {
      /** @description 导入定时任务 */
      200: {
        content: {
          'application/json': components['schemas']['TaskEntity'][]
        }
      }
    }
  }
  /** id查询定时任务详情 */
  TaskController_getTaskById: {
    parameters: {
      query: {
        id: string
      }
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id查询定时任务详情 */
      200: {
        content: {
          'application/json': components['schemas']['TaskEntity']
        }
      }
    }
  }
  /** id删除定时任务 */
  TaskController_deleteTaskById: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description id删除定时任务 */
      200: {
        content: {
          'application/json': components['schemas']['DeleteResult']
        }
      }
    }
  }
  /** 启动定时任务 */
  TaskController_startTask: {
    parameters: {
      query: {
        id: string
      }
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description 启动定时任务 */
      200: {
        content: {
          'application/json': components['schemas']['TaskEntity']
        }
      }
    }
  }
  /** 停止定时任务 */
  TaskController_stopTask: {
    parameters: {
      query: {
        id: string
      }
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    responses: {
      /** @description 停止定时任务 */
      200: {
        content: {
          'application/json': components['schemas']['TaskEntity']
        }
      }
    }
  }
}
