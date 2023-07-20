import pygame
import os   


class Board:
    def __init__(self):
        self.board_size = 8
        self.tile_size = 95
        self.board = [['' for _ in range(self.board_size)] for _ in range(self.board_size)]

    def draw(self, surface):
        for row in range(self.board_size):
            for col in range(self.board_size):
                x = col * self.tile_size
                y = row * self.tile_size
                if (row + col) % 2 == 0:
                    color = (4, 156, 216)  # Light color for white tiles
                else:
                    color = (130,76,65)  # Dark color for black tiles
                pygame.draw.rect(surface, color, (x, y, self.tile_size, self.tile_size))

    def place_piece(self, piece, row, col):
        self.board[row][col] = piece

    def get_piece(self, row, col):
        return self.board[row][col]

    def move_piece(self, start_row, start_col, end_row, end_col):
        piece = self.get_piece(start_row, start_col)
        self.place_piece(piece, end_row, end_col)
        self.place_piece('', start_row, start_col)

    def get_tile_coordinates(self, row, col):
        x = col * self.tile_size
        y = row * self.tile_size
        return x, y

