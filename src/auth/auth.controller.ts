import { Controller, Get, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { GetUser, RoleProtected, Auth } from './decorators';
// import { User } from './entities/user.entity';
// import { RawHeaders } from 'src/common/decorators/raw-headers.decorator';
// import { IncomingHttpHeaders } from 'http';
// import { UserRoleGuard } from './guards/user-role/user-role.guard';
// import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user)
  }
  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: string,
  //   @RawHeaders() rawHeaders: string[],
  //   @Headers() headers: IncomingHttpHeaders
  // ) {

  //   return { user, headers }
  // }

  // @Get('private2')
  // @RoleProtected(ValidRoles.superUser)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // testingPrivateRoute2(
  //   @GetUser() user: User,
  // ) {

  //   return { user, }
  // }

  // @Get('private3')
  // @Auth(ValidRoles.superUser)
  // testingPrivateRoute3(
  //   @GetUser() user: User,
  // ) {

  //   return { user, }
  // }
}
