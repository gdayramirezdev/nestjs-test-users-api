import { Injectable, ForbiddenException } from '@nestjs/common'
import axios from 'axios'
import { allowedRoles, Role } from 'src/users/user.entity'

@Injectable()
export class GhibliService {
  private readonly api = axios.create({ baseURL: 'https://ghibliapi.vercel.app' })

  async getByRole(role: Role) {

    if (!allowedRoles.includes(role)) {
      throw new ForbiddenException('Role not allowed to access this resource');
    }

    const { data } = await this.api.get(`/${role}`);
    return data;
  }
}
