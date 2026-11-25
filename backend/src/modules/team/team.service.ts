import { Injectable } from '@nestjs/common';
import type { TeamMember } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { parseSocialLinks } from '../common/utils/json';
import type { TeamMemberDto } from './dto/team-response.dto';

const publicTeamWhere = { deletedAt: null, published: true } as const;

const toTeamMemberDto = (member: TeamMember): TeamMemberDto => ({
  id: member.id,
  slug: member.slug,
  name: member.name,
  role: member.role,
  bio: member.bio,
  avatar: member.avatar,
  expertise: member.expertise,
  socialLinks: parseSocialLinks(member.socialLinks),
  featured: member.featured,
  order: member.order,
  createdAt: member.createdAt,
  updatedAt: member.updatedAt,
});

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TeamMemberDto[]> {
    const members = await this.prisma.teamMember.findMany({
      where: publicTeamWhere,
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
    return members.map(toTeamMemberDto);
  }

  async findFeatured(limit: number): Promise<TeamMemberDto[]> {
    const members = await this.prisma.teamMember.findMany({
      where: { ...publicTeamWhere, featured: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      take: limit,
    });
    return members.map(toTeamMemberDto);
  }
}
