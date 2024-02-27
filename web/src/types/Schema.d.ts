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
  '/admin/sys/user/save': {
    /** 保存用户 */
    post: operations['UserController_saveUser']
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
  '/admin/sys/user/upload': {
    /** 上传头像 */
    post: operations['UserController_upload']
  }
  '/admin/sys/user/deleteAvatar': {
    get: operations['UserController_deleteAvatar']
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
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
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
    PageResultDto: Record<string, never>
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
      /** @description 状态:0-无效,1-有效 */
      status?: number
    }
    UserSaveDto: {
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
      /** @description 状态:0-无效,1-有效 */
      status?: number
      /** @description 角色ids */
      roleIds?: string[]
    }
    UserImportDto: {
      /** @description 用户列表 */
      list: components['schemas']['UserSaveDto'][]
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
      /** @description 菜单类型:0-一级菜单,1-子菜单,2-权限 */
      menuType: number
      /** @description 类型为权限时必填 */
      perms?: string[]
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
      /** @description 分页用户列表 */
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto']
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
  /** 保存用户 */
  UserController_saveUser: {
    parameters: {
      header?: {
        /** @description Bearer token */
        Authorization?: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UserSaveDto']
      }
    }
    responses: {
      /** @description 保存用户 */
      200: {
        content: {
          'application/json': components['schemas']['UserEntity']
        }
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
      /** @description 导入用户 */
      200: {
        content: {
          'application/json': components['schemas']['UserEntity'][]
        }
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
          'application/json': components['schemas']['UserSaveDto']
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
  /** 上传头像 */
  UserController_upload: {
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
  UserController_deleteAvatar: {
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
      /** @description 分页菜单列表 */
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto']
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
      /** @description 分页角色列表 */
      200: {
        content: {
          'application/json': components['schemas']['PageResultDto']
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
}
